import { useState } from "react";
import Icon from "@/components/ui/icon";

type Tab = "home" | "tasks" | "reminders" | "stats" | "settings";

interface SubTask {
  id: number;
  text: string;
  done: boolean;
}

interface Task {
  id: number;
  title: string;
  category: string;
  priority: "high" | "medium" | "low";
  done: boolean;
  subtasks: SubTask[];
  expanded: boolean;
}

interface Reminder {
  id: number;
  text: string;
  time: string;
  day: string;
  active: boolean;
}

const INITIAL_TASKS: Task[] = [
  {
    id: 1,
    title: "Подготовить квартальный отчёт",
    category: "Работа",
    priority: "high",
    done: false,
    expanded: false,
    subtasks: [
      { id: 1, text: "Собрать данные по продажам", done: true },
      { id: 2, text: "Сделать графики", done: false },
      { id: 3, text: "Написать резюме", done: false },
    ],
  },
  {
    id: 2,
    title: "Купить продукты на неделю",
    category: "Личное",
    priority: "medium",
    done: false,
    expanded: false,
    subtasks: [
      { id: 1, text: "Овощи и фрукты", done: false },
      { id: 2, text: "Молочные продукты", done: false },
    ],
  },
  {
    id: 3,
    title: "Прочитать книгу по психологии",
    category: "Развитие",
    priority: "low",
    done: true,
    expanded: false,
    subtasks: [
      { id: 1, text: "Главы 1-5", done: true },
      { id: 2, text: "Главы 6-10", done: true },
    ],
  },
];

const INITIAL_REMINDERS: Reminder[] = [
  { id: 1, text: "Утренняя медитация", time: "08:00", day: "Каждый день", active: true },
  { id: 2, text: "Встреча с командой", time: "10:30", day: "Пн, Ср, Пт", active: true },
  { id: 3, text: "Спортзал", time: "19:00", day: "Вт, Чт", active: false },
  { id: 4, text: "Планирование следующего дня", time: "21:00", day: "Каждый день", active: true },
];

const PRIORITY_COLORS = {
  high: { bg: "bg-red-100", text: "text-red-600", dot: "bg-red-400", label: "Высокий" },
  medium: { bg: "bg-amber-100", text: "text-amber-600", dot: "bg-amber-400", label: "Средний" },
  low: { bg: "bg-green-100", text: "text-green-600", dot: "bg-green-400", label: "Низкий" },
};

const CATEGORY_COLORS: Record<string, string> = {
  "Работа": "#C4714A",
  "Личное": "#7A9E7E",
  "Развитие": "#9B7DB5",
};

export default function Index() {
  const [tab, setTab] = useState<Tab>("home");
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [reminders, setReminders] = useState<Reminder[]>(INITIAL_REMINDERS);
  const [newTaskText, setNewTaskText] = useState("");
  const [showAddTask, setShowAddTask] = useState(false);

  const completedTasks = tasks.filter((t) => t.done).length;
  const totalTasks = tasks.length;
  const progressPercent = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const toggleTask = (id: number) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const toggleSubTask = (taskId: number, subId: number) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? { ...t, subtasks: t.subtasks.map((s) => (s.id === subId ? { ...s, done: !s.done } : s)) }
          : t
      )
    );
  };

  const toggleExpand = (id: number) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, expanded: !t.expanded } : t)));
  };

  const addTask = () => {
    if (!newTaskText.trim()) return;
    setTasks((prev) => [
      {
        id: Date.now(),
        title: newTaskText.trim(),
        category: "Личное",
        priority: "medium",
        done: false,
        expanded: false,
        subtasks: [],
      },
      ...prev,
    ]);
    setNewTaskText("");
    setShowAddTask(false);
  };

  const toggleReminder = (id: number) => {
    setReminders((prev) => prev.map((r) => (r.id === id ? { ...r, active: !r.active } : r)));
  };

  const navItems: { id: Tab; icon: string; label: string }[] = [
    { id: "home", icon: "Home", label: "Главная" },
    { id: "tasks", icon: "CheckSquare", label: "Задачи" },
    { id: "reminders", icon: "Bell", label: "Напомин." },
    { id: "stats", icon: "BarChart2", label: "Статист." },
    { id: "settings", icon: "Settings", label: "Настройки" },
  ];

  const tabTitles: Record<Tab, string> = {
    home: "Добрый день! ☀️",
    tasks: "Мои задачи",
    reminders: "Напоминания",
    stats: "Аналитика",
    settings: "Настройки",
  };

  return (
    <div className="min-h-screen flex flex-col items-center" style={{ background: "var(--warm-cream)" }}>
      <div className="w-full max-w-md flex flex-col min-h-screen relative">
        {/* Header */}
        <div className="px-5 pt-8 pb-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium" style={{ color: "var(--warm-terra)" }}>
                {new Date().toLocaleDateString("ru-RU", { weekday: "long", day: "numeric", month: "long" })}
              </p>
              <h1 className="text-2xl font-semibold" style={{ color: "var(--warm-brown)" }}>
                {tabTitles[tab]}
              </h1>
            </div>
            <div
              className="w-10 h-10 rounded-2xl flex items-center justify-center text-white text-lg font-bold"
              style={{ background: "var(--warm-terra)" }}
            >
              А
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-5 pb-32">
          {tab === "home" && (
            <HomeTab
              tasks={tasks}
              completedTasks={completedTasks}
              totalTasks={totalTasks}
              progressPercent={progressPercent}
              reminders={reminders}
              setTab={setTab}
            />
          )}
          {tab === "tasks" && (
            <TasksTab
              tasks={tasks}
              toggleTask={toggleTask}
              toggleSubTask={toggleSubTask}
              toggleExpand={toggleExpand}
              showAddTask={showAddTask}
              setShowAddTask={setShowAddTask}
              newTaskText={newTaskText}
              setNewTaskText={setNewTaskText}
              addTask={addTask}
            />
          )}
          {tab === "reminders" && <RemindersTab reminders={reminders} toggleReminder={toggleReminder} />}
          {tab === "stats" && <StatsTab tasks={tasks} />}
          {tab === "settings" && <SettingsTab />}
        </div>

        {/* Bottom Navigation */}
        <div
          className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md px-4 pb-6 pt-3"
          style={{ background: "linear-gradient(to top, var(--warm-cream) 70%, transparent)" }}
        >
          <div
            className="flex justify-around items-center rounded-2xl px-2 py-2"
            style={{
              background: "rgba(255,251,245,0.97)",
              border: "1px solid var(--warm-sand)",
              boxShadow: "0 -4px 30px rgba(107,63,40,0.08)",
            }}
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setTab(item.id)}
                className={`nav-item ${tab === item.id ? "active" : ""}`}
              >
                <Icon name={item.icon} size={20} />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── HOME TAB ──────────────────────────────────────────────────────
function HomeTab({
  tasks,
  completedTasks,
  totalTasks,
  progressPercent,
  reminders,
  setTab,
}: {
  tasks: Task[];
  completedTasks: number;
  totalTasks: number;
  progressPercent: number;
  reminders: Reminder[];
  setTab: (t: Tab) => void;
}) {
  const urgentTasks = tasks.filter((t) => !t.done && t.priority === "high");

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Daily Progress Card */}
      <div className="warm-card p-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide" style={{ color: "var(--warm-terra)" }}>
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
            ? "🎉 Все задачи выполнены!"
            : `Осталось ${totalTasks - completedTasks} задач`}
        </p>
      </div>

      {/* Motivational quote */}
      <div
        className="warm-card p-4 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, rgba(196,113,74,0.12), rgba(240,160,122,0.08))" }}
      >
        <p className="font-caveat text-xl" style={{ color: "var(--warm-brown)" }}>
          "Каждый маленький шаг ведёт к большой цели"
        </p>
        <p className="text-xs mt-1" style={{ color: "var(--warm-terra)", opacity: 0.7 }}>
          Совет дня
        </p>
        <div className="absolute right-4 top-3 text-4xl opacity-20">✨</div>
      </div>

      {/* Urgent tasks */}
      {urgentTasks.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold" style={{ color: "var(--warm-brown)" }}>
              🔥 Срочные задачи
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
            ⏰ Напоминания сегодня
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

// ── TASKS TAB ────────────────────────────────────────────────────
function TasksTab({
  tasks,
  toggleTask,
  toggleSubTask,
  toggleExpand,
  showAddTask,
  setShowAddTask,
  newTaskText,
  setNewTaskText,
  addTask,
}: {
  tasks: Task[];
  toggleTask: (id: number) => void;
  toggleSubTask: (taskId: number, subId: number) => void;
  toggleExpand: (id: number) => void;
  showAddTask: boolean;
  setShowAddTask: (v: boolean) => void;
  newTaskText: string;
  setNewTaskText: (v: string) => void;
  addTask: () => void;
}) {
  const active = tasks.filter((t) => !t.done);
  const done = tasks.filter((t) => t.done);

  return (
    <div className="space-y-4 animate-fade-in">
      {showAddTask ? (
        <div className="warm-card p-4 animate-scale-in">
          <p className="text-sm font-medium mb-2" style={{ color: "var(--warm-brown)" }}>
            Новая задача
          </p>
          <input
            className="w-full rounded-xl px-3 py-2 text-sm outline-none"
            style={{
              background: "var(--warm-beige)",
              color: "var(--warm-brown)",
              border: "1px solid var(--warm-sand)",
            }}
            placeholder="Название задачи..."
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
            autoFocus
          />
          <div className="flex gap-2 mt-3">
            <button
              className="flex-1 py-2 rounded-xl text-sm font-medium text-white"
              style={{ background: "var(--warm-terra)" }}
              onClick={addTask}
            >
              Добавить
            </button>
            <button
              className="px-4 py-2 rounded-xl text-sm"
              style={{ background: "var(--warm-beige)", color: "var(--warm-brown)" }}
              onClick={() => {
                setShowAddTask(false);
                setNewTaskText("");
              }}
            >
              Отмена
            </button>
          </div>
        </div>
      ) : (
        <button
          className="w-full warm-card p-3 flex items-center gap-2 justify-center text-sm font-medium"
          style={{ color: "var(--warm-terra)", borderStyle: "dashed" }}
          onClick={() => setShowAddTask(true)}
        >
          <Icon name="Plus" size={18} />
          Добавить задачу
        </button>
      )}

      {active.length > 0 && (
        <div>
          <p
            className="text-xs font-semibold uppercase tracking-wide mb-2"
            style={{ color: "var(--warm-terra)", opacity: 0.7 }}
          >
            В работе · {active.length}
          </p>
          <div className="space-y-2">
            {active.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                toggleTask={toggleTask}
                toggleSubTask={toggleSubTask}
                toggleExpand={toggleExpand}
              />
            ))}
          </div>
        </div>
      )}

      {done.length > 0 && (
        <div>
          <p
            className="text-xs font-semibold uppercase tracking-wide mb-2"
            style={{ color: "var(--warm-green)", opacity: 0.8 }}
          >
            Выполнено · {done.length}
          </p>
          <div className="space-y-2">
            {done.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                toggleTask={toggleTask}
                toggleSubTask={toggleSubTask}
                toggleExpand={toggleExpand}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function TaskCard({
  task,
  toggleTask,
  toggleSubTask,
  toggleExpand,
}: {
  task: Task;
  toggleTask: (id: number) => void;
  toggleSubTask: (taskId: number, subId: number) => void;
  toggleExpand: (id: number) => void;
}) {
  const pColor = PRIORITY_COLORS[task.priority];
  const subDone = task.subtasks.filter((s) => s.done).length;
  const subTotal = task.subtasks.length;
  const catColor = CATEGORY_COLORS[task.category] || "var(--warm-terra)";

  return (
    <div className={`warm-card p-4 ${task.done ? "opacity-60" : ""}`}>
      <div className="flex items-start gap-3">
        <button
          className={`task-checkbox mt-0.5 ${task.done ? "checked" : ""}`}
          onClick={() => toggleTask(task.id)}
        >
          {task.done && <Icon name="Check" size={12} className="text-white" />}
        </button>

        <div className="flex-1 min-w-0">
          <p
            className="text-sm font-medium leading-snug"
            style={{
              color: "var(--warm-brown)",
              textDecoration: task.done ? "line-through" : "none",
            }}
          >
            {task.title}
          </p>
          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
            <span
              className="text-xs px-2 py-0.5 rounded-full font-medium"
              style={{ background: catColor + "18", color: catColor }}
            >
              {task.category}
            </span>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${pColor.bg} ${pColor.text}`}>
              <span className={`inline-block w-1.5 h-1.5 rounded-full mr-1 align-middle ${pColor.dot}`} />
              {pColor.label}
            </span>
          </div>

          {subTotal > 0 && (
            <div className="mt-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs" style={{ color: "var(--warm-terra)", opacity: 0.7 }}>
                  Подзадачи {subDone}/{subTotal}
                </span>
                <button
                  className="text-xs font-medium"
                  style={{ color: "var(--warm-terra)" }}
                  onClick={() => toggleExpand(task.id)}
                >
                  {task.expanded ? "Скрыть ↑" : "Показать ↓"}
                </button>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${subTotal ? (subDone / subTotal) * 100 : 0}%` }}
                />
              </div>

              {task.expanded && (
                <div className="mt-2 space-y-1.5 animate-fade-in">
                  {task.subtasks.map((sub) => (
                    <button
                      key={sub.id}
                      className="flex items-center gap-2 w-full text-left"
                      onClick={() => toggleSubTask(task.id, sub.id)}
                    >
                      <div
                        className={`task-checkbox w-4 h-4 rounded-md flex-shrink-0 ${sub.done ? "checked" : ""}`}
                        style={{ minWidth: 16, minHeight: 16 }}
                      >
                        {sub.done && <Icon name="Check" size={9} className="text-white" />}
                      </div>
                      <span
                        className="text-xs"
                        style={{
                          color: "var(--warm-brown)",
                          textDecoration: sub.done ? "line-through" : "none",
                          opacity: sub.done ? 0.5 : 1,
                        }}
                      >
                        {sub.text}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── REMINDERS TAB ─────────────────────────────────────────────────
function RemindersTab({
  reminders,
  toggleReminder,
}: {
  reminders: Reminder[];
  toggleReminder: (id: number) => void;
}) {
  return (
    <div className="space-y-4 animate-fade-in">
      <div
        className="warm-card p-4 flex items-center gap-3"
        style={{ background: "linear-gradient(135deg, rgba(196,113,74,0.12), rgba(240,160,122,0.06))" }}
      >
        <div className="text-3xl">🔔</div>
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

// ── STATS TAB ─────────────────────────────────────────────────────
function StatsTab({ tasks }: { tasks: Task[] }) {
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

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Week Chart */}
      <div className="warm-card p-5">
        <p className="text-sm font-semibold mb-4" style={{ color: "var(--warm-brown)" }}>
          📊 Задачи за неделю
        </p>
        <div className="flex items-end gap-2 h-32">
          {weekData.map((d, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full relative" style={{ height: 96 }}>
                <div
                  className="w-full rounded-lg absolute bottom-0"
                  style={{ height: `${(d.total / maxTotal) * 100}%`, background: "var(--warm-beige)" }}
                />
                <div
                  className="w-full rounded-lg absolute bottom-0 transition-all duration-700"
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
            <div className="w-3 h-3 rounded" style={{ background: "var(--warm-terra)" }} />
            <span className="text-xs" style={{ color: "var(--warm-terra)" }}>
              Выполнено
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <div
              className="w-3 h-3 rounded"
              style={{ background: "var(--warm-beige)", border: "1px solid var(--warm-sand)" }}
            />
            <span className="text-xs" style={{ color: "var(--warm-terra)", opacity: 0.7 }}>
              Всего
            </span>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "Средний балл", value: "82%", icon: "TrendingUp", desc: "за эту неделю" },
          { label: "Серия дней", value: "5 🔥", icon: "Zap", desc: "дней подряд" },
          { label: "Лучший день", value: "Вт", icon: "Star", desc: "все задачи выполнены" },
          { label: "Всего задач", value: String(tasks.length), icon: "List", desc: "в списке" },
        ].map((s, i) => (
          <div key={i} className="warm-card p-4">
            <Icon name={s.icon} size={20} style={{ color: "var(--warm-terra)" }} />
            <p className="text-2xl font-bold mt-2" style={{ color: "var(--warm-brown)" }}>
              {s.value}
            </p>
            <p className="text-xs font-medium" style={{ color: "var(--warm-brown)" }}>
              {s.label}
            </p>
            <p className="text-xs" style={{ color: "var(--warm-terra)", opacity: 0.6 }}>
              {s.desc}
            </p>
          </div>
        ))}
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
function SettingsTab() {
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
