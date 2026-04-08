import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Task, Reminder, CATEGORY_COLORS } from "./types";

// ── REMINDERS TAB ─────────────────────────────────────────────────

interface RemindersTabProps {
  reminders: Reminder[];
  toggleReminder: (id: number) => void;
}

export function RemindersTab({ reminders, toggleReminder }: RemindersTabProps) {
  return (
    <div className="space-y-4 animate-fade-in">
      <div
        className="warm-card p-4 flex items-center gap-3"
        style={{ background: "linear-gradient(135deg, rgba(196,113,74,0.12), rgba(240,160,122,0.06))" }}
      >
        <div
          className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0"
          style={{ background: "var(--warm-terra)" }}
        >
          <Icon name="Bell" size={18} className="text-white" />
        </div>
        <div>
          <p className="text-sm font-semibold" style={{ color: "var(--warm-brown)" }}>
            Уведомления настроены
          </p>
          <p className="text-xs" style={{ color: "var(--warm-terra)", opacity: 0.7 }}>
            {reminders.filter((r) => r.active).length} активных напоминаний
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {reminders.map((r, i) => (
          <div
            key={r.id}
            className="warm-card p-4 flex items-center gap-3 animate-slide-up"
            style={{ animationDelay: `${i * 0.08}s`, opacity: 0 }}
          >
            <div
              className="w-12 h-12 rounded-2xl flex flex-col items-center justify-center flex-shrink-0"
              style={{ background: r.active ? "var(--warm-terra)" : "var(--warm-beige)" }}
            >
              <span
                className="text-xs font-bold leading-none"
                style={{ color: r.active ? "white" : "var(--warm-terra)" }}
              >
                {r.time.split(":")[0]}
              </span>
              <span
                className="text-xs leading-none"
                style={{ color: r.active ? "rgba(255,255,255,0.8)" : "var(--warm-terra)" }}
              >
                :{r.time.split(":")[1]}
              </span>
            </div>
            <div className="flex-1">
              <p
                className="text-sm font-medium"
                style={{ color: "var(--warm-brown)", opacity: r.active ? 1 : 0.5 }}
              >
                {r.text}
              </p>
              <p className="text-xs" style={{ color: "var(--warm-terra)", opacity: 0.6 }}>
                {r.day}
              </p>
            </div>
            <button
              onClick={() => toggleReminder(r.id)}
              className="relative w-11 h-6 rounded-full transition-colors duration-300 flex-shrink-0"
              style={{ background: r.active ? "var(--warm-terra)" : "var(--warm-sand)" }}
            >
              <div
                className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-300"
                style={{ transform: r.active ? "translateX(22px)" : "translateX(2px)" }}
              />
            </button>
          </div>
        ))}
      </div>

      <button
        className="w-full warm-card p-3 flex items-center gap-2 justify-center text-sm font-medium"
        style={{ color: "var(--warm-terra)", borderStyle: "dashed" }}
      >
        <Icon name="Plus" size={18} />
        Добавить напоминание
      </button>
    </div>
  );
}

// ── PROGRESS TAB ─────────────────────────────────────────────────

interface ProgressTabProps {
  tasks: Task[];
}

export function ProgressTab({ tasks }: ProgressTabProps) {
  const byCategory = tasks.reduce<Record<string, { total: number; done: number }>>((acc, t) => {
    if (!acc[t.category]) acc[t.category] = { total: 0, done: 0 };
    acc[t.category].total++;
    if (t.done) acc[t.category].done++;
    return acc;
  }, {});

  const weekData = [
    { day: "Пн", done: 3, total: 5 },
    { day: "Вт", done: 5, total: 5 },
    { day: "Ср", done: 2, total: 4 },
    { day: "Чт", done: 4, total: 6 },
    { day: "Пт", done: 1, total: 3 },
    { day: "Сб", done: 0, total: 2 },
    { day: "Вс", done: 2, total: 2 },
  ];

  const maxTotal = Math.max(...weekData.map((d) => d.total));

  const achievements = [
    { label: "Дней подряд", value: "5", icon: "Flame", desc: "личный рекорд" },
    { label: "Задач за неделю", value: "17", icon: "CheckCircle", desc: "выполнено" },
    { label: "Часов фокуса", value: "12", icon: "Timer", desc: "на этой неделе" },
    { label: "Советов применено", value: "3", icon: "Sparkles", desc: "из раздела советов" },
  ];

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Achievements */}
      <div>
        <p className="text-sm font-semibold mb-3" style={{ color: "var(--warm-brown)" }}>
          Твои достижения
        </p>
        <div className="grid grid-cols-2 gap-3">
          {achievements.map((a, i) => (
            <div key={i} className="warm-card p-4">
              <div
                className="w-9 h-9 rounded-2xl flex items-center justify-center mb-2"
                style={{ background: "var(--warm-beige)" }}
              >
                <Icon name={a.icon} size={18} style={{ color: "var(--warm-terra)" }} />
              </div>
              <p className="text-2xl font-bold" style={{ color: "var(--warm-brown)" }}>
                {a.value}
              </p>
              <p className="text-xs font-medium mt-0.5" style={{ color: "var(--warm-brown)" }}>
                {a.label}
              </p>
              <p className="text-xs" style={{ color: "var(--warm-terra)", opacity: 0.6 }}>
                {a.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Week Chart */}
      <div className="warm-card p-5">
        <p className="text-sm font-semibold mb-4" style={{ color: "var(--warm-brown)" }}>
          Задачи за неделю
        </p>
        <div className="flex items-end gap-2 h-32">
          {weekData.map((d, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full relative" style={{ height: 96 }}>
                <div
                  className="w-full rounded-xl absolute bottom-0"
                  style={{ height: `${(d.total / maxTotal) * 100}%`, background: "var(--warm-beige)" }}
                />
                <div
                  className="w-full rounded-xl absolute bottom-0 transition-all duration-700"
                  style={{
                    height: `${(d.done / maxTotal) * 100}%`,
                    background: "linear-gradient(180deg, var(--warm-peach), var(--warm-terra))",
                  }}
                />
              </div>
              <span className="text-xs" style={{ color: "var(--warm-terra)", opacity: 0.7 }}>
                {d.day}
              </span>
            </div>
          ))}
        </div>
        <div className="flex gap-4 mt-3">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full" style={{ background: "var(--warm-terra)" }} />
            <span className="text-xs" style={{ color: "var(--warm-terra)" }}>
              Выполнено
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <div
              className="w-3 h-3 rounded-full"
              style={{ background: "var(--warm-beige)", border: "1px solid var(--warm-sand)" }}
            />
            <span className="text-xs" style={{ color: "var(--warm-terra)", opacity: 0.7 }}>
              Всего
            </span>
          </div>
        </div>
      </div>

      {/* By Category */}
      <div className="warm-card p-5">
        <p className="text-sm font-semibold mb-3" style={{ color: "var(--warm-brown)" }}>
          По категориям
        </p>
        <div className="space-y-3">
          {Object.entries(byCategory).map(([cat, data]) => {
            const pct = Math.round((data.done / data.total) * 100);
            const color = CATEGORY_COLORS[cat] || "var(--warm-terra)";
            return (
              <div key={cat}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm" style={{ color: "var(--warm-brown)" }}>
                    {cat}
                  </span>
                  <span className="text-sm font-medium" style={{ color }}>
                    {data.done}/{data.total}
                  </span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${pct}%`,
                      background: `linear-gradient(90deg, ${color}, ${color}99)`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── SETTINGS TAB ──────────────────────────────────────────────────

export function SettingsTab() {
  const [notifications, setNotifications] = useState(true);
  const [sync, setSync] = useState(false);
  const [sound, setSound] = useState(true);

  const toggleSettings = [
    {
      label: "Уведомления",
      desc: "Push-уведомления о задачах",
      value: notifications,
      toggle: () => setNotifications((v) => !v),
    },
    {
      label: "Синхронизация",
      desc: "Синхронизация между устройствами",
      value: sync,
      toggle: () => setSync((v) => !v),
    },
    {
      label: "Звук",
      desc: "Звуковые напоминания",
      value: sound,
      toggle: () => setSound((v) => !v),
    },
  ];

  const menuItems = [
    { icon: "User", label: "Профиль и аккаунт" },
    { icon: "Palette", label: "Тема оформления" },
    { icon: "Calendar", label: "Формат планирования" },
    { icon: "Download", label: "Экспорт данных" },
    { icon: "HelpCircle", label: "Помощь и поддержка" },
  ];

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Profile Card */}
      <div
        className="warm-card p-5 flex items-center gap-4"
        style={{ background: "linear-gradient(135deg, rgba(196,113,74,0.1), rgba(240,160,122,0.05))" }}
      >
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-bold"
          style={{ background: "var(--warm-terra)" }}
        >
          А
        </div>
        <div>
          <p className="font-semibold text-lg" style={{ color: "var(--warm-brown)" }}>
            Алексей
          </p>
          <p className="text-sm" style={{ color: "var(--warm-terra)", opacity: 0.7 }}>
            alex@email.com
          </p>
          <span
            className="text-xs px-2 py-0.5 rounded-full font-medium mt-1 inline-block"
            style={{ background: "var(--warm-terra)", color: "white" }}
          >
            Pro план
          </span>
        </div>
      </div>

      {/* Toggles */}
      <div className="warm-card overflow-hidden">
        {toggleSettings.map((s, i) => (
          <div
            key={i}
            className={`flex items-center gap-3 px-4 py-3.5 ${i < toggleSettings.length - 1 ? "border-b" : ""}`}
            style={{ borderColor: "var(--warm-sand)" }}
          >
            <div className="flex-1">
              <p className="text-sm font-medium" style={{ color: "var(--warm-brown)" }}>
                {s.label}
              </p>
              <p className="text-xs" style={{ color: "var(--warm-terra)", opacity: 0.6 }}>
                {s.desc}
              </p>
            </div>
            <button
              onClick={s.toggle}
              className="relative w-11 h-6 rounded-full transition-colors duration-300 flex-shrink-0"
              style={{ background: s.value ? "var(--warm-terra)" : "var(--warm-sand)" }}
            >
              <div
                className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-300"
                style={{ transform: s.value ? "translateX(22px)" : "translateX(2px)" }}
              />
            </button>
          </div>
        ))}
      </div>

      {/* Menu Items */}
      <div className="warm-card overflow-hidden">
        {menuItems.map((item, i) => (
          <button
            key={i}
            className={`w-full flex items-center gap-3 px-4 py-3.5 text-left transition-colors ${
              i < menuItems.length - 1 ? "border-b" : ""
            }`}
            style={{ borderColor: "var(--warm-sand)" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--warm-beige)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <Icon name={item.icon} size={18} style={{ color: "var(--warm-terra)" }} />
            <span className="text-sm flex-1" style={{ color: "var(--warm-brown)" }}>
              {item.label}
            </span>
            <Icon name="ChevronRight" size={16} style={{ color: "var(--warm-terra)", opacity: 0.5 }} />
          </button>
        ))}
      </div>

      <p className="text-center text-xs pb-2" style={{ color: "var(--warm-terra)", opacity: 0.4 }}>
        Версия 1.0.0 · Уютный планировщик
      </p>
    </div>
  );
}
