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

const AI_CHAT_RESPONSES = [
  "Давай разберём твою задачу вместе! Расскажи подробнее, что тебе нужно сделать, и я составлю пошаговый план.",
  "Попробуй технику 2 минут: если задача займёт меньше 2 минут — сделай сразу. Это поможет убрать накопившиеся мелочи.",
  "Хорошая идея! Начни с самого лёгкого шага — это создаст импульс и придаст уверенности.",
  "Помни: идеальный план — враг хорошего. Начни с того, что есть, и корректируй по ходу.",
];

interface ChatMessage {
  role: "user" | "ai";
  text: string;
}

function AiChatPage({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "ai", text: "Привет! Я твой ИИ-помощник. Расскажи, с чем тебе нужна помощь сегодня?" },
  ]);
  const [input, setInput] = useState("");

  const send = () => {
    const text = input.trim();
    if (!text) return;
    const reply = AI_CHAT_RESPONSES[Math.floor(Math.random() * AI_CHAT_RESPONSES.length)];
    setMessages((prev) => [
      ...prev,
      { role: "user", text },
      { role: "ai", text: reply },
    ]);
    setInput("");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col animate-slide-in-right"
      style={{ background: "var(--app-bg)", maxWidth: 448, margin: "0 auto" }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-3 px-5 pt-8 pb-4"
        style={{ borderBottom: "1px solid var(--app-nav-border)" }}
      >
        <button
          onClick={onClose}
          className="w-9 h-9 rounded-2xl flex items-center justify-center"
          style={{ background: "var(--app-primary-light)" }}
        >
          <Icon name="ArrowLeft" size={18} style={{ color: "var(--app-primary)" }} />
        </button>
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{ background: "var(--app-primary)" }}
          >
            <Icon name="Sparkles" size={16} className="text-white" />
          </div>
          <div>
            <p className="text-sm font-extrabold" style={{ color: "var(--app-text)" }}>
              ИИ-помощник
            </p>
            <p className="text-xs font-semibold" style={{ color: "var(--app-text-soft)" }}>
              Всегда онлайн
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
          >
            <div
              className="max-w-[80%] px-4 py-3 rounded-2xl text-sm font-semibold leading-relaxed"
              style={
                msg.role === "user"
                  ? { background: "var(--app-primary)", color: "white", borderBottomRightRadius: 6 }
                  : { background: "var(--app-card)", color: "var(--app-text)", border: "1px solid var(--app-card-border)", borderBottomLeftRadius: 6 }
              }
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div
        className="px-4 pb-8 pt-3"
        style={{ borderTop: "1px solid var(--app-nav-border)", background: "var(--app-nav-bg)" }}
      >
        <div className="flex gap-2">
          <input
            className="flex-1 rounded-2xl px-4 py-3 text-sm font-semibold outline-none"
            style={{
              background: "var(--app-primary-light)",
              color: "var(--app-text)",
              border: "1px solid var(--app-card-border)",
            }}
            placeholder="Напиши свой вопрос..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
          />
          <button
            onClick={send}
            className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ background: "var(--app-primary)" }}
          >
            <Icon name="Send" size={18} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function TipsTab() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [showChat, setShowChat] = useState(false);
  const aiTipIndex = new Date().getDay() % AI_TIPS.length;

  if (showChat) {
    return <AiChatPage onClose={() => setShowChat(false)} />;
  }

  return (
    <div className="space-y-4 animate-fade-in">
      {/* ИИ совет дня */}
      <div
        className="warm-card p-4"
        style={{ background: "linear-gradient(135deg, color-mix(in srgb, var(--app-primary) 12%, transparent), color-mix(in srgb, var(--app-accent) 8%, transparent))" }}
      >
        <div className="flex items-center gap-2 mb-2">
          <div
            className="w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "var(--app-primary)" }}
          >
            <Icon name="Sparkles" size={14} className="text-white" />
          </div>
          <p className="text-xs font-extrabold" style={{ color: "var(--app-primary)" }}>
            ИИ совет дня
          </p>
        </div>
        <p className="text-sm font-semibold leading-relaxed" style={{ color: "var(--app-text)" }}>
          {AI_TIPS[aiTipIndex]}
        </p>
        <button
          className="mt-3 text-xs font-extrabold px-4 py-2 rounded-2xl"
          style={{ background: "var(--app-primary)", color: "white" }}
          onClick={() => setShowChat(true)}
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
                  <p className="text-sm font-extrabold" style={{ color: "var(--app-text)" }}>
                    {tip.title}
                  </p>
                  <p className="text-xs mt-0.5 leading-relaxed font-semibold" style={{ color: "var(--app-text-soft)" }}>
                    {tip.desc}
                  </p>
                </div>
                <div
                  className="flex-shrink-0 mt-1 transition-transform duration-300"
                  style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                >
                  <Icon name="ChevronDown" size={16} style={{ color: "var(--app-text-soft)" }} />
                </div>
              </button>

              {isOpen && (
                <div
                  className="px-4 pb-4 animate-fade-in"
                  style={{ borderTop: "1px solid var(--app-card-border)" }}
                >
                  <p className="text-xs font-extrabold mt-3 mb-2" style={{ color: "var(--app-text-soft)" }}>
                    Как это сделать
                  </p>
                  <div className="space-y-2 mb-4">
                    {tip.steps.map((step, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <div
                          className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-extrabold mt-0.5"
                          style={{ background: tip.color + "18", color: tip.color }}
                        >
                          {i + 1}
                        </div>
                        <p className="text-xs leading-relaxed font-semibold" style={{ color: "var(--app-text)" }}>
                          {step}
                        </p>
                      </div>
                    ))}
                  </div>
                  <button
                    className="w-full py-2.5 rounded-2xl text-sm font-extrabold text-white"
                    style={{ background: tip.color }}
                    onClick={tip.id === 4 ? () => setShowChat(true) : undefined}
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
