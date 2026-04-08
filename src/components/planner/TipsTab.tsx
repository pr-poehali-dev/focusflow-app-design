import { useState } from "react";
import Icon from "@/components/ui/icon";

interface Tip {
  id: number;
  title: string;
  desc: string;
  icon: string;
  color: string;
  steps: string[];
  actionLabel: string;
}

const TIPS: Tip[] = [
  {
    id: 1,
    title: "Техника Помодоро",
    desc: "Работай 25 минут — отдыхай 5. Повтори 4 раза, потом большой перерыв.",
    icon: "Timer",
    color: "#C4714A",
    steps: [
      "Выбери одну задачу из списка",
      "Поставь таймер на 25 минут",
      "Работай без отвлечений до сигнала",
      "Сделай паузу 5 минут — встань, подвигайся",
    ],
    actionLabel: "Попробовать сейчас",
  },
  {
    id: 2,
    title: "Дыхательная практика",
    desc: "Успокой ум за 2 минуты с помощью простого дыхания.",
    icon: "Wind",
    color: "#7A9E7E",
    steps: [
      "Сядь удобно и закрой глаза",
      "Вдох носом — считай до 4",
      "Задержи дыхание — считай до 4",
      "Выдох через рот — считай до 8",
    ],
    actionLabel: "Попробовать сейчас",
  },
  {
    id: 3,
    title: "Разбей задачу",
    desc: "Большая задача пугает? Раздели её на мелкие шаги и начни с первого.",
    icon: "Scissors",
    color: "#9B7DB5",
    steps: [
      "Запиши задачу одним предложением",
      "Спроси себя: что нужно сделать первым?",
      "Раздели на 3–5 подзадач",
      "Выполни только первый шаг прямо сейчас",
    ],
    actionLabel: "Попробовать сейчас",
  },
  {
    id: 4,
    title: "Спроси ИИ-помощника",
    desc: "Не знаешь с чего начать? Опиши задачу ИИ и получи готовый план.",
    icon: "Sparkles",
    color: "#D4956A",
    steps: [
      "Опиши задачу своими словами",
      "Попроси разбить её на шаги",
      "Уточни сроки и приоритет",
      "Добавь шаги в свой список задач",
    ],
    actionLabel: "Получить совет",
  },
];

const AI_TIPS = [
  "Начни день с самой сложной задачи — утром энергии больше всего.",
  "Если не можешь начать — поставь таймер на 2 минуты и просто начни.",
  "Выключи уведомления на 25 минут. Мир не рухнет, зато ты успеешь больше.",
  "Не планируй больше 3 важных задач на день — это реалистично.",
  "После выполнения задачи сделай паузу и отметь это — мозг любит маленькие победы.",
];

export default function TipsTab() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const aiTipIndex = new Date().getDay() % AI_TIPS.length;

  return (
    <div className="space-y-4 animate-fade-in">
      {/* ИИ совет дня */}
      <div
        className="warm-card p-4"
        style={{
          background: "linear-gradient(135deg, rgba(196,113,74,0.13), rgba(212,149,106,0.08))",
        }}
      >
        <div className="flex items-center gap-2 mb-2">
          <div
            className="w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "var(--warm-terra)" }}
          >
            <Icon name="Sparkles" size={14} className="text-white" />
          </div>
          <p className="text-xs font-semibold" style={{ color: "var(--warm-terra)" }}>
            ИИ совет дня
          </p>
        </div>
        <p className="font-caveat text-xl leading-snug" style={{ color: "var(--warm-brown)" }}>
          "{AI_TIPS[aiTipIndex]}"
        </p>
        <button
          className="mt-3 text-xs font-medium px-3 py-1.5 rounded-xl"
          style={{ background: "var(--warm-terra)", color: "white" }}
        >
          Получить совет
        </button>
      </div>

      {/* Карточки техник */}
      <div className="space-y-3">
        {TIPS.map((tip) => {
          const isOpen = expanded === tip.id;
          return (
            <div key={tip.id} className="warm-card overflow-hidden">
              <button
                className="w-full p-4 flex items-start gap-3 text-left"
                onClick={() => setExpanded(isOpen ? null : tip.id)}
              >
                <div
                  className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: tip.color + "18" }}
                >
                  <Icon name={tip.icon} size={20} style={{ color: tip.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold" style={{ color: "var(--warm-brown)" }}>
                    {tip.title}
                  </p>
                  <p className="text-xs mt-0.5 leading-relaxed" style={{ color: "var(--warm-terra)", opacity: 0.8 }}>
                    {tip.desc}
                  </p>
                </div>
                <div
                  className="flex-shrink-0 mt-1 transition-transform duration-300"
                  style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                >
                  <Icon name="ChevronDown" size={16} style={{ color: "var(--warm-terra)", opacity: 0.6 }} />
                </div>
              </button>

              {isOpen && (
                <div
                  className="px-4 pb-4 animate-fade-in"
                  style={{ borderTop: "1px solid var(--warm-sand)" }}
                >
                  <p className="text-xs font-medium mt-3 mb-2" style={{ color: "var(--warm-terra)" }}>
                    Как это сделать
                  </p>
                  <div className="space-y-2 mb-4">
                    {tip.steps.map((step, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <div
                          className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-semibold mt-0.5"
                          style={{ background: tip.color + "18", color: tip.color }}
                        >
                          {i + 1}
                        </div>
                        <p className="text-xs leading-relaxed" style={{ color: "var(--warm-brown)" }}>
                          {step}
                        </p>
                      </div>
                    ))}
                  </div>
                  <button
                    className="w-full py-2.5 rounded-2xl text-sm font-medium text-white"
                    style={{ background: tip.color }}
                  >
                    {tip.actionLabel}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
