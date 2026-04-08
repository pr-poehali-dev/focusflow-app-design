export type Tab = "home" | "tasks" | "reminders" | "stats" | "settings";

export interface SubTask {
  id: number;
  text: string;
  done: boolean;
}

export interface Task {
  id: number;
  title: string;
  category: string;
  priority: "high" | "medium" | "low";
  done: boolean;
  subtasks: SubTask[];
  expanded: boolean;
}

export interface Reminder {
  id: number;
  text: string;
  time: string;
  day: string;
  active: boolean;
}

export const INITIAL_TASKS: Task[] = [
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

export const INITIAL_REMINDERS: Reminder[] = [
  { id: 1, text: "Утренняя медитация", time: "08:00", day: "Каждый день", active: true },
  { id: 2, text: "Встреча с командой", time: "10:30", day: "Пн, Ср, Пт", active: true },
  { id: 3, text: "Спортзал", time: "19:00", day: "Вт, Чт", active: false },
  { id: 4, text: "Планирование следующего дня", time: "21:00", day: "Каждый день", active: true },
];

export const PRIORITY_COLORS = {
  high: { bg: "bg-red-100", text: "text-red-600", dot: "bg-red-400", label: "Высокий" },
  medium: { bg: "bg-amber-100", text: "text-amber-600", dot: "bg-amber-400", label: "Средний" },
  low: { bg: "bg-green-100", text: "text-green-600", dot: "bg-green-400", label: "Низкий" },
};

export const CATEGORY_COLORS: Record<string, string> = {
  "Работа": "#C4714A",
  "Личное": "#7A9E7E",
  "Развитие": "#9B7DB5",
};
