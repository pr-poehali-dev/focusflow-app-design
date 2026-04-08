export type Tab = "home" | "tasks" | "reminders" | "progress" | "tips" | "companion" | "settings";

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
    title: "Сдать реферат по истории",
    category: "Учёба",
    priority: "high",
    done: false,
    expanded: false,
    subtasks: [
      { id: 1, text: "Найти источники в библиотеке", done: true },
      { id: 2, text: "Написать план реферата", done: false },
      { id: 3, text: "Оформить по требованиям", done: false },
    ],
  },
  {
    id: 2,
    title: "Убраться в комнате",
    category: "Дом",
    priority: "medium",
    done: false,
    expanded: false,
    subtasks: [
      { id: 1, text: "Разобрать стол", done: false },
      { id: 2, text: "Пропылесосить", done: false },
    ],
  },
  {
    id: 3,
    title: "Прочитать книгу «Маленький принц»",
    category: "Личное",
    priority: "low",
    done: true,
    expanded: false,
    subtasks: [
      { id: 1, text: "Главы 1–10", done: true },
      { id: 2, text: "Главы 11–27", done: true },
    ],
  },
];

export const INITIAL_REMINDERS: Reminder[] = [
  { id: 1, text: "Утренняя зарядка", time: "08:00", day: "Каждый день", active: true },
  { id: 2, text: "Выпить воду", time: "10:00", day: "Каждый день", active: true },
  { id: 3, text: "Прогулка на улице", time: "17:00", day: "Пн, Ср, Пт", active: false },
  { id: 4, text: "Подготовка ко сну", time: "22:00", day: "Каждый день", active: true },
];

export const PRIORITY_COLORS = {
  high: { bg: "bg-red-100", text: "text-red-500", dot: "bg-red-400", label: "Важно" },
  medium: { bg: "bg-amber-100", text: "text-amber-600", dot: "bg-amber-400", label: "Обычное" },
  low: { bg: "bg-green-100", text: "text-green-600", dot: "bg-green-400", label: "Несрочно" },
};

export const CATEGORY_COLORS: Record<string, string> = {
  "Учёба": "#C4714A",
  "Дом": "#7A9E7E",
  "Личное": "#9B7DB5",
  "Работа": "#C4714A",
  "Развитие": "#9B7DB5",
};
