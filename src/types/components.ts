import { 
  Todo, 
  TodoAddHandler, 
  TodoToggleHandler, 
  TodoDeleteHandler,
  TodoCancelHandler,
  TodoReorderHandler,
  TodoCategoryChangeHandler,
  TodoImportanceChangeHandler,
  TodoImportance
} from './Todo';

// Пропсы для TodoForm
export interface TodoFormProps {
  onAdd: (text: string, category: string, importance: TodoImportance) => void;
  categories: string[];
  suggestCategory?: (text: string) => string;
}

// Пропсы для TodoList
export interface TodoListProps {
  todos: Todo[];
  categories: string[];
  onToggle: TodoToggleHandler;
  onDelete: TodoDeleteHandler;
  onCancel: TodoCancelHandler;
  onReorder: TodoReorderHandler;
  onChangeCategory: TodoCategoryChangeHandler;
  onChangeImportance: TodoImportanceChangeHandler;
}

// Пропсы для TodoItem
export interface TodoItemProps {
  todo: Todo;
  onToggle: TodoToggleHandler;
  onDelete: TodoDeleteHandler;
  onCancel: TodoCancelHandler;
  onChangeImportance: TodoImportanceChangeHandler;
}

// Пропсы для Header
export interface HeaderProps {
  title: string;
  subtitle?: string;
}

// Пропсы для Footer
export interface FooterProps {
  year?: number;
  appName?: string;
}

// Пропсы для TasksSection
export interface TasksSectionProps {
  todos: Todo[];
  categories: string[];
  onToggle: TodoToggleHandler;
  onDelete: TodoDeleteHandler;
  onReorder: TodoReorderHandler;
  onChangeCategory: TodoCategoryChangeHandler;
  onAdd: TodoAddHandler;
} 