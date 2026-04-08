import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Tab, INITIAL_TASKS, INITIAL_REMINDERS } from "@/components/planner/types";
import HomeTab from "@/components/planner/HomeTab";
import TasksTab from "@/components/planner/TasksTab";
import { RemindersTab, StatsTab, SettingsTab } from "@/components/planner/OtherTabs";

export default function Index() {
  const [tab, setTab] = useState<Tab>("home");
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [reminders, setReminders] = useState(INITIAL_REMINDERS);
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
        priority: "medium" as const,
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
