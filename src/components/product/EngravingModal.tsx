"use client";
import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";

const MAX_LENGTH = 20;

export function EngravingModal({
  open,
  onClose,
  value,
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  value: string;
  onSave: (value: string) => void;
}) {
  const [text, setText] = useState(value);
  const [position, setPosition] = useState<"interieur" | "exterieur">("interieur");

  return (
    <Modal open={open} onClose={onClose} title="Ajouter une gravure">
      <p className="mb-4 text-sm text-gris-texte">Offert — jusqu&apos;à {MAX_LENGTH} caractères.</p>
      <div className="mb-4 flex gap-3">
        {(["interieur", "exterieur"] as const).map((p) => (
          <button
            key={p}
            type="button"
            aria-pressed={position === p}
            onClick={() => setPosition(p)}
            className={`min-h-[44px] flex-1 border px-3 text-xs uppercase tracking-[0.06em] ${position === p ? "border-vert-profond bg-vert-profond text-white" : "border-ligne"}`}
          >
            {p === "interieur" ? "Intérieur" : "Extérieur"}
          </button>
        ))}
      </div>
      <label htmlFor="engraving-text" className="mb-1.5 block text-xs uppercase tracking-[0.06em] text-gris-texte">
        Votre texte
      </label>
      <input
        id="engraving-text"
        value={text}
        maxLength={MAX_LENGTH}
        onChange={(e) => setText(e.target.value)}
        className="min-h-[52px] w-full border border-ligne px-4 text-lg font-script outline-none focus:border-vert-profond"
        placeholder="Ex. : Toujours"
      />
      <p className="mt-1 text-right text-xs text-gris-texte">{text.length}/{MAX_LENGTH}</p>
      {text && (
        <div className="mt-4 flex h-24 items-center justify-center border border-dashed border-ligne bg-ivoire">
          <p className="font-script text-3xl">{text}</p>
        </div>
      )}
      <div className="mt-6 flex gap-3">
        <Button variant="secondary" fullWidth onClick={() => { setText(""); onSave(""); onClose(); }}>
          Retirer la gravure
        </Button>
        <Button fullWidth onClick={() => { onSave(text); onClose(); }}>
          Enregistrer
        </Button>
      </div>
    </Modal>
  );
}
