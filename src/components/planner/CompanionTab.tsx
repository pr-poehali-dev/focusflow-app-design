import { useState } from "react";

const COMPANIONS = [
  {
    id: "frog",
    name: "Лягушонок",
    emoji: "🐸",
    desc: "Спокойный и сосредоточенный",
    color: "#7A9E7E",
  },
  {
    id: "sheep",
    name: "Овечка",
    emoji: "🐑",
    desc: "Мягкий и поддерживающий",
    color: "#A8A8C0",
  },
  {
    id: "fox",
    name: "Лисёнок",
    emoji: "🦊",
    desc: "Умный и энергичный",
    color: "#D4714A",
  },
];

const MASCOT_IMG = "https://cdn.poehali.dev/projects/39e7606e-a802-4106-a3e6-290c18a163a4/bucket/ac0f2b24-a63c-46c1-88c7-2f840d844b3c.png";

export default function CompanionTab() {
  const [selected, setSelected] = useState<string | null>(null);

  const selectedCompanion = COMPANIONS.find((c) => c.id === selected);

  return (
    <div className="animate-fade-in space-y-5">
      {/* Заголовок */}
      <div className="text-center pt-2">
        <p className="text-xl font-extrabold" style={{ color: "var(--app-text)" }}>
          Выбери своего компаньона
        </p>
        <p className="text-sm font-semibold mt-1" style={{ color: "var(--app-text-soft)" }}>
          Он будет поддерживать тебя каждый день
        </p>
      </div>

      {/* Картинка с зверятами */}
      <div
        className="warm-card overflow-hidden flex items-center justify-center"
        style={{ minHeight: 180 }}
      >
        <img
          src={MASCOT_IMG}
          alt="Компаньоны"
          className="w-full object-contain"
          style={{ maxHeight: 200 }}
        />
      </div>

      {/* Карточки выбора */}
      <div className="space-y-3">
        {COMPANIONS.map((c) => {
          const isSelected = selected === c.id;
          return (
            <button
              key={c.id}
              onClick={() => setSelected(c.id)}
              className="w-full warm-card p-4 flex items-center gap-4 text-left transition-all active:scale-98"
              style={
                isSelected
                  ? { border: `2px solid ${c.color}`, background: c.color + "12" }
                  : {}
              }
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
                style={{ background: c.color + "18" }}
              >
                {c.emoji}
              </div>
              <div className="flex-1">
                <p className="text-base font-extrabold" style={{ color: "var(--app-text)" }}>
                  {c.name}
                </p>
                <p className="text-xs font-semibold mt-0.5" style={{ color: "var(--app-text-soft)" }}>
                  {c.desc}
                </p>
              </div>
              {isSelected && (
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: c.color }}
                >
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Кнопка выбора */}
      {selected && (
        <button
          className="w-full py-3.5 rounded-2xl text-sm font-extrabold text-white animate-scale-in"
          style={{ background: selectedCompanion?.color || "var(--app-primary)" }}
        >
          Выбрать {selectedCompanion?.name}
        </button>
      )}

      {!selected && (
        <div
          className="text-center py-3 rounded-2xl text-sm font-semibold"
          style={{
            border: "1.5px dashed var(--app-nav-border)",
            color: "var(--app-text-soft)",
          }}
        >
          Нажми на карточку, чтобы выбрать
        </div>
      )}
    </div>
  );
}
