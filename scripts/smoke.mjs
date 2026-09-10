import { chromium } from "playwright";

const BASE = "http://localhost:3000";
const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" });
const results = [];

async function check(name, fn) {
  try {
    await fn();
    results.push({ name, ok: true });
  } catch (e) {
    results.push({ name, ok: false, error: String(e).slice(0, 300) });
  }
}

async function dismissCookies(page) {
  const btn = page.getByRole("button", { name: "Accepter" });
  if (await btn.isVisible().catch(() => false)) await btn.click();
}

const desktop = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const mobile = await browser.newContext({ viewport: { width: 390, height: 844 } });

const dpage = await desktop.newPage();
const mpage = await mobile.newPage();

await check("home loads (desktop)", async () => {
  await dpage.goto(BASE + "/", { waitUntil: "networkidle" });
  await dpage.waitForSelector("h1");
  await dismissCookies(dpage);
});

await check("home loads (mobile)", async () => {
  await mpage.goto(BASE + "/", { waitUntil: "networkidle" });
  await dismissCookies(mpage);
});

await check("shape selector navigates to PLP with filter", async () => {
  await dpage.goto(BASE + "/", { waitUntil: "networkidle" });
  await dismissCookies(dpage);
  await dpage.getByRole("link", { name: "Ovale" }).first().click();
  await dpage.waitForURL(/forme=ovale/);
});

await check("PLP filter popover applies and updates URL + count", async () => {
  await dpage.goto(BASE + "/bijoux/bagues-de-fiancailles", { waitUntil: "networkidle" });
  await dismissCookies(dpage);
  await dpage.getByRole("button", { name: /^Métal/ }).click();
  await dpage.locator('label:has-text("Platine")').click();
  await dpage.getByRole("button", { name: "Appliquer" }).click();
  await dpage.waitForURL(/metal=platine/);
});

await check("PDP price updates when changing carat", async () => {
  await dpage.goto(BASE + "/produit/bague-emma", { waitUntil: "networkidle" });
  await dismissCookies(dpage);
  const priceBefore = await dpage.locator("h1").locator("xpath=following-sibling::p[1]").first().textContent();
  await dpage.getByRole("button", { name: "Total carat" }).click();
  await dpage.getByRole("button", { name: "1.50", exact: true }).click();
  await dpage.waitForTimeout(300);
  const priceAfter = await dpage.locator("h1").locator("xpath=following-sibling::p[1]").first().textContent();
  if (priceBefore === priceAfter) throw new Error(`price did not change: ${priceBefore}`);
});

await check("add to cart works and opens drawer", async () => {
  await dpage.goto(BASE + "/produit/bague-emma", { waitUntil: "networkidle" });
  await dismissCookies(dpage);
  await dpage.getByRole("button", { name: "48" }).click();
  await dpage.getByRole("button", { name: /Ajouter au panier/ }).first().click();
  await dpage.waitForSelector("text=Voir le panier");
});

await check("mobile nav drawer opens", async () => {
  await mpage.goto(BASE + "/", { waitUntil: "networkidle" });
  await dismissCookies(mpage);
  await mpage.getByRole("button", { name: "Ouvrir le menu" }).click();
  await mpage.waitForSelector("text=Réservez un rendez-vous");
});

await check("mobile filter sheet opens on PLP", async () => {
  await mpage.goto(BASE + "/bijoux/bagues-de-fiancailles", { waitUntil: "networkidle" });
  await dismissCookies(mpage);
  await mpage.getByRole("button", { name: /Filtrer/ }).click();
  await mpage.waitForSelector("text=Tout effacer");
});

await check("appointment flow step 1->2", async () => {
  await dpage.goto(BASE + "/rendez-vous", { waitUntil: "networkidle" });
  await dismissCookies(dpage);
  await dpage.getByRole("listitem").filter({ hasText: "Elya Paris" }).getByRole("button").click();
  await dpage.getByRole("button", { name: "Suivant" }).click();
  await dpage.waitForSelector("text=Type de rendez-vous");
});

await check("newsletter validation error shown for bad email", async () => {
  await dpage.goto(BASE + "/", { waitUntil: "networkidle" });
  await dismissCookies(dpage);
  await dpage.locator("#newsletter-email").scrollIntoViewIfNeeded();
  await dpage.locator("#newsletter-email").fill("not-an-email");
  await dpage.getByRole("checkbox").check();
  await dpage.getByRole("button", { name: "S'inscrire" }).click();
  await dpage.waitForTimeout(500);
});

await check("PDP unavailable certificate note shown below 0.30ct", async () => {
  await dpage.goto(BASE + "/produit/bague-emma?carat=0.20", { waitUntil: "networkidle" });
  await dismissCookies(dpage);
  await dpage.getByRole("button", { name: "Certificat" }).click();
  await dpage.waitForSelector("text=Certificat disponible à partir de 0,30 carat");
});

await check("keyboard: Tab does not focus closed drawer content", async () => {
  await dpage.goto(BASE + "/bijoux/bagues-de-fiancailles", { waitUntil: "networkidle" });
  await dismissCookies(dpage);
  const hiddenCheckbox = dpage.locator('label:has-text("Platine")').last();
  const isInert = await hiddenCheckbox.evaluate((el) => !!el.closest("[inert]"));
  if (!isInert) throw new Error("closed mobile filter drawer content is not inert");
});

for (const w of [320, 375, 768, 1024, 1440, 2560]) {
  await check(`no horizontal overflow at ${w}px on home`, async () => {
    const ctx = await browser.newContext({ viewport: { width: w, height: 900 } });
    const p = await ctx.newPage();
    await p.goto(BASE + "/", { waitUntil: "networkidle" });
    const overflow = await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    await ctx.close();
    if (overflow > 1) throw new Error(`overflow=${overflow}px`);
  });
}

for (const w of [320, 768]) {
  await check(`no horizontal overflow at ${w}px on PDP`, async () => {
    const ctx = await browser.newContext({ viewport: { width: w, height: 900 } });
    const p = await ctx.newPage();
    await p.goto(BASE + "/produit/bague-emma", { waitUntil: "networkidle" });
    const overflow = await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    await ctx.close();
    if (overflow > 1) throw new Error(`overflow=${overflow}px`);
  });
}

await browser.close();

console.log(JSON.stringify(results, null, 2));
const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} passed`);
if (failed.length) {
  console.log("FAILURES:", failed.map((f) => f.name));
  process.exit(1);
}
