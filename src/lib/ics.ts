export function downloadAppointmentIcs(params: { title: string; description: string; location: string; start: Date; durationMinutes?: number }) {
  const { title, description, location, start, durationMinutes = 45 } = params;
  const end = new Date(start.getTime() + durationMinutes * 60000);

  const format = (d: Date) => d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Elya Joaillerie//Rendez-vous//FR",
    "BEGIN:VEVENT",
    `UID:${Date.now()}@elya-joaillerie.fr`,
    `DTSTAMP:${format(new Date())}`,
    `DTSTART:${format(start)}`,
    `DTEND:${format(end)}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${location}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "rendez-vous-elya-joaillerie.ics";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
