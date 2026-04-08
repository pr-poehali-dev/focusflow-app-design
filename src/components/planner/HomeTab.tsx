import Icon from "@/components/ui/icon";
import { Tab, Task, Reminder } from "./types";

interface HomeTabProps {
  tasks: Task[];
  completedTasks: number;
  totalTasks: number;
  progressPercent: number;
  reminders: Reminder[];
  setTab: (t: Tab) => void;
}

const NAV_GRID: { id: Tab; icon: string; label: string }[] = [
  { id: "home", icon: "Home", label: "Главная" },
  { id: "tasks", icon: "CalendarCheck", label: "Расписание" },
  { id: "reminders", icon: "Bell", label: "Напомин." },
  { id: "tips", icon: "Sparkles", label: "Советы" },
  { id: "progress", icon: "TrendingUp", label: "Прогресс" },
  { id: "settings", icon: "User", label: "Профиль" },
];

export default function HomeTab({
  tasks,
  completedTasks,
  totalTasks,
  progressPercent,
  reminders,
  setTab,
}: HomeTabProps) {
  const urgentTasks = tasks.filter((t) => !t.done && t.priority === "high");

  return (
    <div className="space-y-5 animate-fade-in">
      {/* FocusFlow Hero */}
      <div className="text-center pt-2 pb-1">
        <h1
          className="text-4xl font-extrabold tracking-tight"
          style={{ color: "var(--app-text)", fontFamily: "Nunito, sans-serif", letterSpacing: "-0.01em" }}
        >
          FocusFlow
        </h1>
        <p className="text-sm mt-1 font-semibold" style={{ color: "var(--app-text-soft)" }}>
          Твой помощник каждый день
        </p>
      </div>

      {/* Nav Grid — стиль как на скриншоте */}
      <div className="warm-card p-4">
        <div className="grid grid-cols-3 gap-3">
          {NAV_GRID.map((item) => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className="flex flex-col items-center gap-1.5 py-3 px-2 rounded-2xl transition-all active:scale-95"
              style={{ background: "var(--app-primary-light)" }}
            >
              <Icon name={item.icon} size={22} style={{ color: "var(--app-primary)" }} />
              <span className="text-xs font-bold" style={{ color: "var(--app-text)" }}>
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Daily Progress Card */}
      <div className="warm-card p-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-xs font-bold" style={{ color: "var(--app-text-soft)" }}>
              Прогресс дня
            </p>
            <p className="text-3xl font-extrabold mt-0.5" style={{ color: "var(--app-text)" }}>
              {progressPercent}
              <span className="text-lg font-semibold">%</span>
            </p>
          </div>
          <div
            className="w-16 h-16 rounded-2xl flex flex-col items-center justify-center"
            style={{ background: "var(--app-primary-light)" }}
          >
            <span className="text-2xl font-extrabold" style={{ color: "var(--app-primary)" }}>
              {completedTasks}
            </span>
            <span className="text-xs font-bold" style={{ color: "var(--app-text-soft)" }}>
              из {totalTasks}
            </span>
          </div>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
        </div>
        <p className="text-xs mt-2 font-semibold" style={{ color: "var(--app-text-soft)" }}>
          {completedTasks === totalTasks && totalTasks > 0
            ? "Все задачи выполнены!"
            : `Осталось ${totalTasks - completedTasks} задач`}
        </p>
      </div>

      {/* Urgent tasks */}
      {urgentTasks.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-bold" style={{ color: "var(--app-text)" }}>
              Срочные задачи
            </p>
            <button
              className="text-xs font-bold"
              style={{ color: "var(--app-primary)" }}
              onClick={() => setTab("tasks")}
            >
              Все →
            </button>
          </div>
          <div className="space-y-2">
            {urgentTasks.slice(0, 2).map((t) => (
              <div key={t.id} className="warm-card p-3 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: "var(--app-primary)" }} />
                <p className="text-sm font-semibold flex-1" style={{ color: "var(--app-text)" }}>
                  {t.title}
                </p>
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-bold"
                  style={{ background: "var(--app-primary-light)", color: "var(--app-primary)" }}
                >
                  {t.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Today's reminders */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-bold" style={{ color: "var(--app-text)" }}>
            Напоминания сегодня
          </p>
          <button
            className="text-xs font-bold"
            style={{ color: "var(--app-primary)" }}
            onClick={() => setTab("reminders")}
          >
            Все →
          </button>
        </div>
        <div className="space-y-2">
          {reminders
            .filter((r) => r.active)
            .slice(0, 3)
            .map((r) => (
              <div key={r.id} className="warm-card p-3 flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-xs font-bold"
                  style={{ background: "var(--app-primary)", color: "white" }}
                >
                  {r.time}
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: "var(--app-text)" }}>
                    {r.text}
                  </p>
                  <p className="text-xs font-medium" style={{ color: "var(--app-text-soft)" }}>
                    {r.day}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Выполнено", value: completedTasks, icon: "CheckCircle" },
          { label: "В работе", value: totalTasks - completedTasks, icon: "Clock" },
          { label: "Напомин.", value: reminders.filter((r) => r.active).length, icon: "Bell" },
        ].map((s, i) => (
          <div key={i} className="warm-card p-3 text-center">
            <div className="flex justify-center mb-1">
              <Icon name={s.icon} size={18} style={{ color: "var(--app-primary)" }} />
            </div>
            <p className="text-2xl font-extrabold" style={{ color: "var(--app-text)" }}>
              {s.value}
            </p>
            <p className="text-xs font-bold" style={{ color: "var(--app-text-soft)" }}>
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
