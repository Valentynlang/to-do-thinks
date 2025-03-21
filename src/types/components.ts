import { 
  Todo, 
  TodoAddHandler, 
  TodoToggleHandler, 
  TodoDeleteHandler, 
  TodoReorderHandler,
  TodoCategoryChangeHandler
} from './Todo';

// Пропсы для TodoForm
export interface TodoFormProps {
  onAdd: TodoAddHandler;
}

// Пропсы для TodoList
export interface TodoListProps {
  todos: Todo[];
  categories: string[];
  onToggle: TodoToggleHandler;
  onDelete: TodoDeleteHandler;
  onReorder: TodoReorderHandler;
  onChangeCategory: TodoCategoryChangeHandler;
}

// Пропсы для TodoItem
export interface TodoItemProps {
  todo: Todo;
  onToggle: TodoToggleHandler;
  onDelete: TodoDeleteHandler;
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
} 