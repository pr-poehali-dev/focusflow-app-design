import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Task, Reminder, CATEGORY_COLORS } from "./types";

// ── REMINDERS TAB ─────────────────────────────────────────────────

interface RemindersTabProps {
  reminders: Reminder[];
  toggleReminder: (id: number) => void;
  onAdd: (r: Omit<Reminder, "id">) => void;
}

function AddReminderModal({ onClose, onSave }: {
  onClose: () => void;
  onSave: (r: Omit<Reminder, "id">) => void;
}) {
  const today = new Date();
  const [text, setText] = useState("");
  const [time, setTime] = useState("09:00");
  const [selectedDay, setSelectedDay] = useState<number>(today.getDate());
  const [note, setNote] = useState("");

  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1).getDay();
  const dayNames = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
  const monthName = today.toLocaleDateString("ru-RU", { month: "long" });

  const save = () => {
    if (!text.trim()) return;
    onSave({ text: text.trim(), time, day: `${selectedDay} ${monthName}`, active: true });
    onClose();
  };

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center animate-fade-in"
      style={{ background: "rgba(0,0,0,0.3)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-t-3xl p-5 animate-slide-up"
        style={{ background: "var(--app-bg)", maxHeight: "85vh", overflowY: "auto" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle */}
        <div
          className="w-10 h-1 rounded-full mx-auto mb-4"
          style={{ background: "var(--app-nav-border)" }}
        />

        <p className="text-base font-extrabold mb-4" style={{ color: "var(--app-text)" }}>
          Новое напоминание
        </p>

        {/* Title input */}
        <input
          className="w-full rounded-2xl px-4 py-3 text-sm font-semibold outline-none mb-3"
          style={{ background: "var(--app-primary-light)", color: "var(--app-text)", border: "1px solid var(--app-card-border)" }}
          placeholder="Название напоминания..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          autoFocus
        />

        {/* Mini Calendar */}
        <div className="warm-card p-3 mb-3">
          <p className="text-xs font-extrabold mb-2 capitalize" style={{ color: "var(--app-text)" }}>
            {monthName} {today.getFullYear()}
          </p>
          {/* Day labels */}
          <div className="grid grid-cols-7 mb-1">
            {dayNames.map((d) => (
              <div key={d} className="text-center text-xs font-bold py-0.5" style={{ color: "var(--app-text-soft)" }}>
                {d}
              </div>
            ))}
          </div>
          {/* Days */}
          <div className="grid grid-cols-7 gap-0.5">
            {cells.map((d, i) =>
              d === null ? (
                <div key={i} />
              ) : (
                <button
                  key={i}
                  onClick={() => setSelectedDay(d)}
                  className="aspect-square flex items-center justify-center rounded-xl text-xs font-bold transition-all"
                  style={
                    d === selectedDay
                      ? { background: "var(--app-primary)", color: "white" }
                      : d === today.getDate()
                      ? { background: "var(--app-primary-light)", color: "var(--app-primary)" }
                      : { color: "var(--app-text)" }
                  }
                >
                  {d}
                </button>
              )
            )}
          </div>
        </div>

        {/* Time picker */}
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "var(--app-primary-light)" }}
          >
            <Icon name="Clock" size={18} style={{ color: "var(--app-primary)" }} />
          </div>
          <input
            type="time"
            className="flex-1 rounded-2xl px-4 py-2.5 text-sm font-semibold outline-none"
            style={{ background: "var(--app-primary-light)", color: "var(--app-text)", border: "1px solid var(--app-card-border)" }}
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>

        {/* Note */}
        <textarea
          className="w-full rounded-2xl px-4 py-3 text-sm font-semibold outline-none resize-none mb-4"
          style={{ background: "var(--app-primary-light)", color: "var(--app-text)", border: "1px solid var(--app-card-border)" }}
          placeholder="Заметка (необязательно)..."
          rows={2}
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        <div className="flex gap-2">
          <button
            className="flex-1 py-3 rounded-2xl text-sm font-extrabold text-white"
            style={{ background: "var(--app-primary)" }}
            onClick={save}
          >
            Сохранить
          </button>
          <button
            className="px-5 py-3 rounded-2xl text-sm font-bold"
            style={{ background: "var(--app-primary-light)", color: "var(--app-text)" }}
            onClick={onClose}
          >
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
}

export function RemindersTab({ reminders, toggleReminder, onAdd }: RemindersTabProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="space-y-4 animate-fade-in">
      {showModal && (
        <AddReminderModal
          onClose={() => setShowModal(false)}
          onSave={onAdd}
        />
      )}

      <div
        className="warm-card p-4 flex items-center gap-3"
        style={{ background: "linear-gradient(135deg, color-mix(in srgb, var(--app-primary) 12%, transparent), transparent)" }}
      >
        <div
          className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0"
          style={{ background: "var(--app-primary)" }}
        >
          <Icon name="Bell" size={18} className="text-white" />
        </div>
        <div>
          <p className="text-sm font-extrabold" style={{ color: "var(--app-text)" }}>
            Уведомления настроены
          </p>
          <p className="text-xs font-semibold" style={{ color: "var(--app-text-soft)" }}>
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
              style={{ background: r.active ? "var(--app-primary)" : "var(--app-primary-light)" }}
            >
              <span className="text-xs font-extrabold leading-none" style={{ color: r.active ? "white" : "var(--app-primary)" }}>
                {r.time.split(":")[0]}
              </span>
              <span className="text-xs leading-none" style={{ color: r.active ? "rgba(255,255,255,0.8)" : "var(--app-primary)" }}>
                :{r.time.split(":")[1]}
              </span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-extrabold" style={{ color: "var(--app-text)", opacity: r.active ? 1 : 0.5 }}>
                {r.text}
              </p>
              <p className="text-xs font-semibold" style={{ color: "var(--app-text-soft)" }}>
                {r.day}
              </p>
            </div>
            <button
              onClick={() => toggleReminder(r.id)}
              className="relative w-11 h-6 rounded-full transition-colors duration-300 flex-shrink-0"
              style={{ background: r.active ? "var(--app-primary)" : "var(--app-nav-border)" }}
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
        className="w-full warm-card p-3 flex items-center gap-2 justify-center text-sm font-extrabold"
        style={{ color: "var(--app-primary)", borderStyle: "dashed" }}
        onClick={() => setShowModal(true)}
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
      <div>
        <p className="text-sm font-extrabold mb-3" style={{ color: "var(--app-text)" }}>
          Твои достижения
        </p>
        <div className="grid grid-cols-2 gap-3">
          {achievements.map((a, i) => (
            <div key={i} className="warm-card p-4">
              <div className="w-9 h-9 rounded-2xl flex items-center justify-center mb-2" style={{ background: "var(--app-primary-light)" }}>
                <Icon name={a.icon} size={18} style={{ color: "var(--app-primary)" }} />
              </div>
              <p className="text-2xl font-extrabold" style={{ color: "var(--app-text)" }}>{a.value}</p>
              <p className="text-xs font-extrabold mt-0.5" style={{ color: "var(--app-text)" }}>{a.label}</p>
              <p className="text-xs font-semibold" style={{ color: "var(--app-text-soft)" }}>{a.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="warm-card p-5">
        <p className="text-sm font-extrabold mb-4" style={{ color: "var(--app-text)" }}>Задачи за неделю</p>
        <div className="flex items-end gap-2 h-32">
          {weekData.map((d, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full relative" style={{ height: 96 }}>
                <div className="w-full rounded-xl absolute bottom-0" style={{ height: `${(d.total / maxTotal) * 100}%`, background: "var(--app-primary-light)" }} />
                <div className="w-full rounded-xl absolute bottom-0 transition-all duration-700" style={{ height: `${(d.done / maxTotal) * 100}%`, background: "linear-gradient(180deg, var(--app-accent), var(--app-primary))" }} />
              </div>
              <span className="text-xs font-bold" style={{ color: "var(--app-text-soft)" }}>{d.day}</span>
            </div>
          ))}
        </div>
        <div className="flex gap-4 mt-3">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full" style={{ background: "var(--app-primary)" }} />
            <span className="text-xs font-bold" style={{ color: "var(--app-text-soft)" }}>Выполнено</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full" style={{ background: "var(--app-primary-light)", border: "1px solid var(--app-nav-border)" }} />
            <span className="text-xs font-bold" style={{ color: "var(--app-text-soft)" }}>Всего</span>
          </div>
        </div>
      </div>

      <div className="warm-card p-5">
        <p className="text-sm font-extrabold mb-3" style={{ color: "var(--app-text)" }}>По категориям</p>
        <div className="space-y-3">
          {Object.entries(byCategory).map(([cat, data]) => {
            const pct = Math.round((data.done / data.total) * 100);
            const color = CATEGORY_COLORS[cat] || "var(--app-primary)";
            return (
              <div key={cat}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-semibold" style={{ color: "var(--app-text)" }}>{cat}</span>
                  <span className="text-sm font-extrabold" style={{ color }}>{data.done}/{data.total}</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${color}, ${color}99)` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── PROFILE PAGE ──────────────────────────────────────────────────

function ProfilePage({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState("Анастасия");
  const [email, setEmail] = useState("vipsikk@gmail.com");
  const [editing, setEditing] = useState(false);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col animate-slide-in-right"
      style={{ background: "var(--app-bg)", maxWidth: 448, margin: "0 auto" }}
    >
      <div className="flex items-center gap-3 px-5 pt-8 pb-4" style={{ borderBottom: "1px solid var(--app-nav-border)" }}>
        <button onClick={onClose} className="w-9 h-9 rounded-2xl flex items-center justify-center" style={{ background: "var(--app-primary-light)" }}>
          <Icon name="ArrowLeft" size={18} style={{ color: "var(--app-primary)" }} />
        </button>
        <p className="text-base font-extrabold" style={{ color: "var(--app-text)" }}>Профиль и аккаунт</p>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4">
        {/* Avatar */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-20 h-20 rounded-3xl flex items-center justify-center text-white text-3xl font-extrabold" style={{ background: "var(--app-primary)" }}>
            {name[0]}
          </div>
          <button className="text-xs font-extrabold px-3 py-1.5 rounded-xl" style={{ background: "var(--app-primary-light)", color: "var(--app-primary)" }}>
            Изменить фото
          </button>
        </div>

        {/* Fields */}
        <div className="warm-card p-4 space-y-3">
          <div>
            <p className="text-xs font-extrabold mb-1" style={{ color: "var(--app-text-soft)" }}>Имя</p>
            {editing ? (
              <input
                className="w-full rounded-xl px-3 py-2 text-sm font-semibold outline-none"
                style={{ background: "var(--app-primary-light)", color: "var(--app-text)", border: "1px solid var(--app-card-border)" }}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            ) : (
              <p className="text-sm font-semibold" style={{ color: "var(--app-text)" }}>{name}</p>
            )}
          </div>
          <div style={{ borderTop: "1px solid var(--app-card-border)", paddingTop: 12 }}>
            <p className="text-xs font-extrabold mb-1" style={{ color: "var(--app-text-soft)" }}>Email</p>
            {editing ? (
              <input
                className="w-full rounded-xl px-3 py-2 text-sm font-semibold outline-none"
                style={{ background: "var(--app-primary-light)", color: "var(--app-text)", border: "1px solid var(--app-card-border)" }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            ) : (
              <p className="text-sm font-semibold" style={{ color: "var(--app-text)" }}>{email}</p>
            )}
          </div>
        </div>

        <button
          className="w-full py-3 rounded-2xl text-sm font-extrabold"
          style={editing
            ? { background: "var(--app-primary)", color: "white" }
            : { background: "var(--app-primary-light)", color: "var(--app-primary)" }
          }
          onClick={() => setEditing((v) => !v)}
        >
          {editing ? "Сохранить изменения" : "Редактировать"}
        </button>

        <button
          className="w-full py-3 rounded-2xl text-sm font-extrabold"
          style={{ background: "#fee2e2", color: "#ef4444" }}
        >
          Выйти из аккаунта
        </button>
      </div>
    </div>
  );
}

// ── THEMES PAGE ────────────────────────────────────────────────────

const THEMES = [
  { id: "warm", label: "Тёплая", desc: "Терракот и беж", swatch: ["#c4714a", "#f2e8d9", "#faf5ee"] },
  { id: "green", label: "Зелёная", desc: "Природа и покой", swatch: ["#4a9e6a", "#d8f0de", "#f0f7f1"] },
  { id: "pink", label: "Розовая", desc: "Нежная и мягкая", swatch: ["#d4638a", "#fde0ea", "#fff5f7"] },
  { id: "dark", label: "Тёмная", desc: "Уютная ночь", swatch: ["#d4956a", "#2e2820", "#1e1c1a"] },
];

function ThemesPage({ currentTheme, onSelect, onClose }: {
  currentTheme: string;
  onSelect: (t: string) => void;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col animate-slide-in-right" style={{ background: "var(--app-bg)", maxWidth: 448, margin: "0 auto" }}>
      <div className="flex items-center gap-3 px-5 pt-8 pb-4" style={{ borderBottom: "1px solid var(--app-nav-border)" }}>
        <button onClick={onClose} className="w-9 h-9 rounded-2xl flex items-center justify-center" style={{ background: "var(--app-primary-light)" }}>
          <Icon name="ArrowLeft" size={18} style={{ color: "var(--app-primary)" }} />
        </button>
        <p className="text-base font-extrabold" style={{ color: "var(--app-text)" }}>Тема оформления</p>
      </div>
      <div className="flex-1 overflow-y-auto px-5 py-5 space-y-3">
        {THEMES.map((t) => (
          <button
            key={t.id}
            onClick={() => onSelect(t.id)}
            className="w-full warm-card p-4 flex items-center gap-4 text-left transition-all"
            style={currentTheme === t.id ? { border: `2px solid ${t.swatch[0]}` } : {}}
          >
            {/* Swatches */}
            <div className="flex gap-1 flex-shrink-0">
              {t.swatch.map((c, i) => (
                <div key={i} className="w-6 h-10 rounded-xl" style={{ background: c }} />
              ))}
            </div>
            <div className="flex-1">
              <p className="text-sm font-extrabold" style={{ color: "var(--app-text)" }}>{t.label}</p>
              <p className="text-xs font-semibold" style={{ color: "var(--app-text-soft)" }}>{t.desc}</p>
            </div>
            {currentTheme === t.id && (
              <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: t.swatch[0] }}>
                <span className="text-white text-xs font-bold">✓</span>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── SETTINGS TAB ──────────────────────────────────────────────────

interface SettingsTabProps {
  currentTheme: string;
  onThemeChange: (t: string) => void;
}

export function SettingsTab({ currentTheme, onThemeChange }: SettingsTabProps) {
  const [notifications, setNotifications] = useState(true);
  const [sync, setSync] = useState(false);
  const [sound, setSound] = useState(true);
  const [subPage, setSubPage] = useState<"profile" | "themes" | null>(null);

  const toggleSettings = [
    { label: "Уведомления", desc: "Push-уведомления о задачах", value: notifications, toggle: () => setNotifications((v) => !v) },
    { label: "Синхронизация", desc: "Синхронизация между устройствами", value: sync, toggle: () => setSync((v) => !v) },
    { label: "Звук", desc: "Звуковые напоминания", value: sound, toggle: () => setSound((v) => !v) },
  ];

  const menuItems = [
    { icon: "User", label: "Профиль и аккаунт", action: () => setSubPage("profile") },
    { icon: "Palette", label: "Тема оформления", action: () => setSubPage("themes") },
    { icon: "Calendar", label: "Формат планирования", action: () => {} },
    { icon: "Download", label: "Экспорт данных", action: () => {} },
    { icon: "HelpCircle", label: "Помощь и поддержка", action: () => {} },
  ];

  if (subPage === "profile") return <ProfilePage onClose={() => setSubPage(null)} />;
  if (subPage === "themes") return <ThemesPage currentTheme={currentTheme} onSelect={(t) => { onThemeChange(t); }} onClose={() => setSubPage(null)} />;

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Profile Card */}
      <div
        className="warm-card p-5 flex items-center gap-4"
        style={{ background: "linear-gradient(135deg, color-mix(in srgb, var(--app-primary) 10%, transparent), transparent)" }}
      >
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-extrabold" style={{ background: "var(--app-primary)" }}>
          А
        </div>
        <div>
          <p className="font-extrabold text-lg" style={{ color: "var(--app-text)" }}>Анастасия</p>
          <p className="text-sm font-semibold" style={{ color: "var(--app-text-soft)" }}>vipsikk@gmail.com</p>
          <span className="text-xs px-2 py-0.5 rounded-full font-extrabold mt-1 inline-block" style={{ background: "var(--app-primary)", color: "white" }}>
            Pro план
          </span>
        </div>
      </div>

      {/* Toggles */}
      <div className="warm-card overflow-hidden">
        {toggleSettings.map((s, i) => (
          <div key={i} className={`flex items-center gap-3 px-4 py-3.5 ${i < toggleSettings.length - 1 ? "border-b" : ""}`} style={{ borderColor: "var(--app-card-border)" }}>
            <div className="flex-1">
              <p className="text-sm font-extrabold" style={{ color: "var(--app-text)" }}>{s.label}</p>
              <p className="text-xs font-semibold" style={{ color: "var(--app-text-soft)" }}>{s.desc}</p>
            </div>
            <button onClick={s.toggle} className="relative w-11 h-6 rounded-full transition-colors duration-300 flex-shrink-0" style={{ background: s.value ? "var(--app-primary)" : "var(--app-nav-border)" }}>
              <div className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-300" style={{ transform: s.value ? "translateX(22px)" : "translateX(2px)" }} />
            </button>
          </div>
        ))}
      </div>

      {/* Menu Items */}
      <div className="warm-card overflow-hidden">
        {menuItems.map((item, i) => (
          <button
            key={i}
            className={`w-full flex items-center gap-3 px-4 py-3.5 text-left transition-colors ${i < menuItems.length - 1 ? "border-b" : ""}`}
            style={{ borderColor: "var(--app-card-border)" }}
            onClick={item.action}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--app-primary-light)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <Icon name={item.icon} size={18} style={{ color: "var(--app-primary)" }} />
            <span className="text-sm font-semibold flex-1" style={{ color: "var(--app-text)" }}>{item.label}</span>
            <Icon name="ChevronRight" size={16} style={{ color: "var(--app-text-soft)" }} />
          </button>
        ))}
      </div>

      <p className="text-center text-xs font-semibold pb-2" style={{ color: "var(--app-text-soft)", opacity: 0.5 }}>
        Версия 1.0.0 · FocusFlow
      </p>
    </div>
  );
}
