"use client";
import { useMemo, useState } from "react";
import { Stepper } from "@/components/ui/Stepper";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { Chip } from "@/components/ui/Chip";
import { ShopMap } from "@/components/stores/ShopMap";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { shops, getShop } from "@/lib/data/shops";
import { generateAvailability, formatDayLabel } from "@/lib/availability";
import { downloadAppointmentIcs } from "@/lib/ics";
import { cx } from "@/lib/utils";

const STEPS = ["Boutique", "Type de RDV", "Date & heure", "Coordonnées", "Confirmation"];
const TYPES = [
  { value: "boutique", label: "En boutique" },
  { value: "visio", label: "En visioconférence" },
  { value: "telephone", label: "Par téléphone" },
];
const SUBJECTS = ["Bague de fiançailles", "Alliances", "Création sur mesure", "Réparation / ajustement", "Autre demande"];

export default function AppointmentPage() {
  const [step, setStep] = useState(0);
  const [shopSlug, setShopSlug] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [type, setType] = useState<string>("boutique");
  const [subject, setSubject] = useState<string>(SUBJECTS[0]);
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [contact, setContact] = useState({ prenom: "", nom: "", email: "", telephone: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirmed, setConfirmed] = useState(false);

  const availability = useMemo(() => generateAvailability(), []);
  const shop = shopSlug ? getShop(shopSlug) : undefined;

  function canAdvance() {
    if (step === 0) return !!shopSlug || type !== "boutique";
    if (step === 1) return !!type && !!subject;
    if (step === 2) return !!selectedDay && !!selectedSlot;
    return true;
  }

  function submitContact() {
    const next: Record<string, string> = {};
    if (!contact.prenom.trim()) next.prenom = "Champ requis.";
    if (!contact.nom.trim()) next.nom = "Champ requis.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) next.email = "E-mail invalide.";
    if (!contact.telephone.trim()) next.telephone = "Champ requis.";
    setErrors(next);
    if (Object.keys(next).length === 0) {
      setConfirmed(true);
      setStep(4);
    }
  }

  function goNext() {
    if (step === 3) {
      submitContact();
      return;
    }
    if (canAdvance()) setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }

  function addToCalendar() {
    if (!selectedDay || !selectedSlot) return;
    const [h, m] = selectedSlot.split(":").map(Number);
    const start = new Date(selectedDay);
    start.setHours(h, m, 0, 0);
    downloadAppointmentIcs({
      title: `Rendez-vous Elya Joaillerie — ${subject}`,
      description: `Rendez-vous ${type === "boutique" ? `en boutique (${shop?.name ?? ""})` : type === "visio" ? "en visioconférence" : "par téléphone"} au sujet de : ${subject}.`,
      location: type === "boutique" && shop ? `${shop.address}, ${shop.postalCode}` : "À distance",
      start,
    });
  }

  return (
    <>
      <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Prendre rendez-vous" }]} />
      <div className="mx-auto max-w-3xl px-4 pb-24 lg:px-12">
        <h1 className="mb-8 font-serif text-3xl lg:text-4xl">Prendre rendez-vous</h1>
        <div className="mb-10">
          <Stepper steps={STEPS} currentIndex={step} />
        </div>

        {step === 0 && (
          <div>
            <h2 className="mb-4 font-serif text-xl">Choisissez votre boutique</h2>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher une ville…"
              className="mb-4 min-h-[48px] w-full max-w-sm border border-ligne px-4 text-sm outline-none focus:border-bleu-roi"
            />
            <ShopMap shops={shops} query={query} selected={shopSlug} onSelect={setShopSlug} linkToDetail={false} />
          </div>
        )}

        {step === 1 && (
          <div className="space-y-8">
            <div>
              <h2 className="mb-4 font-serif text-xl">Type de rendez-vous</h2>
              <div className="flex flex-wrap gap-3">
                {TYPES.map((t) => (
                  <Chip key={t.value} active={type === t.value} onClick={() => setType(t.value)}>
                    {t.label}
                  </Chip>
                ))}
              </div>
            </div>
            <div>
              <h2 className="mb-4 font-serif text-xl">Sujet</h2>
              <div className="flex flex-wrap gap-3">
                {SUBJECTS.map((s) => (
                  <Chip key={s} active={subject === s} onClick={() => setSubject(s)}>
                    {s}
                  </Chip>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="mb-4 font-serif text-xl">Choisissez une date et un créneau</h2>
            <p className="mb-4 text-xs text-gris-texte">Heures affichées dans votre fuseau horaire local ({Intl.DateTimeFormat().resolvedOptions().timeZone}).</p>
            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
              {availability.map((day) => (
                <button
                  key={day.date.toISOString()}
                  type="button"
                  onClick={() => {
                    setSelectedDay(day.date);
                    setSelectedSlot(null);
                  }}
                  disabled={day.slots.length === 0}
                  className={cx(
                    "flex min-h-[64px] min-w-[76px] flex-col items-center justify-center border text-xs uppercase",
                    selectedDay?.toDateString() === day.date.toDateString() ? "border-bleu-roi bg-bleu-roi text-white" : "border-ligne",
                    day.slots.length === 0 && "cursor-not-allowed opacity-30",
                  )}
                >
                  {formatDayLabel(day.date)}
                </button>
              ))}
            </div>
            {selectedDay && (
              <div className="mt-6">
                <p className="mb-3 text-xs uppercase tracking-[0.06em] text-gris-texte">Créneaux disponibles</p>
                <div className="flex flex-wrap gap-2">
                  {availability.find((d) => d.date.toDateString() === selectedDay.toDateString())?.slots.map((slot) => (
                    <Chip key={slot} active={selectedSlot === slot} onClick={() => setSelectedSlot(slot)}>
                      {slot}
                    </Chip>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {step === 3 && (
          <div className="max-w-md space-y-4">
            <h2 className="mb-2 font-serif text-xl">Vos coordonnées</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField label="Prénom" required value={contact.prenom} onChange={(e) => setContact((c) => ({ ...c, prenom: e.target.value }))} error={errors.prenom} />
              <FormField label="Nom" required value={contact.nom} onChange={(e) => setContact((c) => ({ ...c, nom: e.target.value }))} error={errors.nom} />
            </div>
            <FormField label="E-mail" type="email" required value={contact.email} onChange={(e) => setContact((c) => ({ ...c, email: e.target.value }))} error={errors.email} />
            <FormField label="Téléphone" type="tel" required value={contact.telephone} onChange={(e) => setContact((c) => ({ ...c, telephone: e.target.value }))} error={errors.telephone} />
            <FormField as="textarea" label="Message (facultatif)" value={contact.message} onChange={(e) => setContact((c) => ({ ...c, message: e.target.value }))} />
          </div>
        )}

        {step === 4 && confirmed && (
          <div className="max-w-md">
            <p aria-hidden="true" className="mb-3 text-3xl text-bleu-roi">
              ✓
            </p>
            <h2 className="mb-4 font-serif text-2xl">Rendez-vous confirmé</h2>
            <ul className="mb-6 space-y-1.5 text-sm text-gris-texte">
              <li>
                <strong className="text-noir-texte">Type : </strong>
                {TYPES.find((t) => t.value === type)?.label}
                {type === "boutique" && shop ? ` — ${shop.name}` : ""}
              </li>
              <li>
                <strong className="text-noir-texte">Sujet : </strong>
                {subject}
              </li>
              <li>
                <strong className="text-noir-texte">Date : </strong>
                {selectedDay && formatDayLabel(selectedDay)} à {selectedSlot}
              </li>
              <li>
                <strong className="text-noir-texte">Contact : </strong>
                {contact.prenom} {contact.nom} — {contact.email}
              </li>
            </ul>
            <p className="mb-6 text-sm text-gris-texte">
              Un e-mail de confirmation a été envoyé à {contact.email}. Un joaillier-conseil vous contactera avant votre rendez-vous.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button onClick={addToCalendar}>Ajouter à mon calendrier</Button>
              <Button href="/" variant="secondary">
                Retour à l&apos;accueil
              </Button>
            </div>
          </div>
        )}

        {step < 4 && (
          <div className="mt-10 flex items-center justify-between border-t border-ligne pt-6">
            <button
              type="button"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className="text-xs uppercase tracking-[0.06em] text-gris-texte underline disabled:opacity-30"
            >
              Précédent
            </button>
            <Button onClick={goNext} disabled={!canAdvance()}>
              {step === 3 ? "Confirmer le rendez-vous" : "Suivant"}
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
