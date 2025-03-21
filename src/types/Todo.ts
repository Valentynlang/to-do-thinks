// Статус задачи
export enum TodoStatus {
  ACTIVE = 'active',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

// Уровень важности
export enum TodoImportance {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high'
}

// Основной интерфейс задачи
export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  cancelled?: boolean;
  status: TodoStatus;
  category: string;
  importance: TodoImportance;
  createdAt: Date;
  updatedAt?: Date;
}

// Тип для функции классификации задач
export type TaskClassifier = (text: string) => string;

// Типы для действий с задачами
export type TodoToggleHandler = (id: number) => void;
export type TodoDeleteHandler = (id: number) => void;
export type TodoCancelHandler = (id: number) => void;
export type TodoAddHandler = (text: string) => void;
export type TodoReorderHandler = (sourceIndex: number, destinationIndex: number, categoryName: string) => void;
export type TodoCategoryChangeHandler = (id: number, newCategory: string) => void;
export type TodoImportanceChangeHandler = (id: number, importance: TodoImportance) => void; 