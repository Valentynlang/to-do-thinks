// Основной интерфейс задачи
export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  category: string;
}

// Тип для функции классификации задач
export type TaskClassifier = (text: string) => string;

// Тип для действий с задачами
export type TodoToggleHandler = (id: number) => void;
export type TodoDeleteHandler = (id: number) => void;
export type TodoAddHandler = (text: string) => void;
export type TodoReorderHandler = (sourceIndex: number, destinationIndex: number, categoryName: string) => void;
export type TodoCategoryChangeHandler = (id: number, newCategory: string) => void; 