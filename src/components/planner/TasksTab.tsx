import Icon from "@/components/ui/icon";
import { Task, PRIORITY_COLORS, CATEGORY_COLORS } from "./types";

interface TasksTabProps {
  tasks: Task[];
  toggleTask: (id: number) => void;
  toggleSubTask: (taskId: number, subId: number) => void;
  toggleExpand: (id: number) => void;
  showAddTask: boolean;
  setShowAddTask: (v: boolean) => void;
  newTaskText: string;
  setNewTaskText: (v: string) => void;
  addTask: () => void;
}

export default function TasksTab({
  tasks,
  toggleTask,
  toggleSubTask,
  toggleExpand,
  showAddTask,
  setShowAddTask,
  newTaskText,
  setNewTaskText,
  addTask,
}: TasksTabProps) {
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
