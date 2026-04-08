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
    <div className="space-y-4 animate-fade-in">
      {/* Daily Progress Card */}
      <div className="warm-card p-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-xs font-medium" style={{ color: "var(--warm-terra)" }}>
              Прогресс дня
            </p>
            <p className="text-3xl font-bold mt-1" style={{ color: "var(--warm-brown)" }}>
              {progressPercent}
              <span className="text-lg font-normal">%</span>
            </p>
          </div>
          <div
            className="w-16 h-16 rounded-2xl flex flex-col items-center justify-center"
            style={{ background: "var(--warm-beige)" }}
          >
            <span className="text-2xl font-bold" style={{ color: "var(--warm-terra)" }}>
              {completedTasks}
            </span>
            <span className="text-xs" style={{ color: "var(--warm-terra)", opacity: 0.7 }}>
              из {totalTasks}
            </span>
          </div>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
        </div>
        <p className="text-xs mt-2" style={{ color: "var(--warm-terra)", opacity: 0.7 }}>
          {completedTasks === totalTasks && totalTasks > 0
            ? "Все задачи выполнены!"
            : `Осталось ${totalTasks - completedTasks} задач`}
        </p>
      </div>

      {/* Motivational quote — без стикеров, мягкий блок */}
      <div
        className="warm-card p-4"
        style={{ background: "linear-gradient(135deg, rgba(196,113,74,0.1), rgba(240,160,122,0.07))" }}
      >
        <p className="text-xs font-medium mb-1" style={{ color: "var(--warm-terra)" }}>
          Совет дня
        </p>
        <p className="font-caveat text-xl leading-snug" style={{ color: "var(--warm-brown)" }}>
          "Каждый маленький шаг ведёт к большой цели"
        </p>
        <button
          className="mt-3 text-xs font-medium px-3 py-1.5 rounded-xl"
          style={{ background: "var(--warm-terra)", color: "white" }}
          onClick={() => setTab("tips")}
        >
          Все советы
        </button>
      </div>

      {/* Urgent tasks */}
      {urgentTasks.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold" style={{ color: "var(--warm-brown)" }}>
              Срочные задачи
            </p>
            <button
              className="text-xs font-medium"
              style={{ color: "var(--warm-terra)" }}
              onClick={() => setTab("tasks")}
            >
              Все →
            </button>
          </div>
          <div className="space-y-2">
            {urgentTasks.slice(0, 2).map((t) => (
              <div key={t.id} className="warm-card p-3 flex items-center gap-3">
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: "var(--warm-terra)" }}
                />
                <p className="text-sm flex-1" style={{ color: "var(--warm-brown)" }}>
                  {t.title}
                </p>
                <span
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{ background: "var(--warm-beige)", color: "var(--warm-terra)" }}
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
          <p className="text-sm font-semibold" style={{ color: "var(--warm-brown)" }}>
            Напоминания сегодня
          </p>
          <button
            className="text-xs font-medium"
            style={{ color: "var(--warm-terra)" }}
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
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-white text-xs font-semibold"
                  style={{ background: "var(--warm-terra)" }}
                >
                  {r.time}
                </div>
                <div>
                  <p className="text-sm font-medium" style={{ color: "var(--warm-brown)" }}>
                    {r.text}
                  </p>
                  <p className="text-xs" style={{ color: "var(--warm-terra)", opacity: 0.7 }}>
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
              <Icon name={s.icon} size={18} style={{ color: "var(--warm-terra)" }} />
            </div>
            <p className="text-2xl font-bold" style={{ color: "var(--warm-brown)" }}>
              {s.value}
            </p>
            <p className="text-xs" style={{ color: "var(--warm-terra)", opacity: 0.7 }}>
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
