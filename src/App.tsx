import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Header, Navigation } from './components/layout'
import { TasksList, AddTaskPage, ProfilePage } from './pages'
import { 
  Todo, 
  TodoStatus,
  TodoImportance,
  TaskClassifier, 
  TodoToggleHandler, 
  TodoDeleteHandler, 
  TodoCancelHandler,
  TodoReorderHandler, 
  TodoCategoryChangeHandler,
  TodoImportanceChangeHandler
} from './types/Todo'

// Функция классификации задач (в будущем будет заменена на более сложную логику)
const classifyTask: TaskClassifier = (text: string): string => {
  const lowerText = text.toLowerCase();
  
  if (lowerText.includes('работа') || lowerText.includes('проект') || 
      lowerText.includes('встреча') || lowerText.includes('презентация') ||
      lowerText.includes('work') || lowerText.includes('meeting') || 
      lowerText.includes('project') || lowerText.includes('presentation')) {
    return 'Работа';
  }
  
  if (lowerText.includes('купить') || lowerText.includes('магазин') || 
      lowerText.includes('продукты') || lowerText.includes('shopping') || 
      lowerText.includes('buy') || lowerText.includes('purchase')) {
    return 'Покупки';
  }
  
  if (lowerText.includes('книга') || lowerText.includes('прочитать') || 
      lowerText.includes('учиться') || lowerText.includes('read') || 
      lowerText.includes('learn') || lowerText.includes('study') || 
      lowerText.includes('book')) {
    return 'Образование';
  }
  
  if (lowerText.includes('спорт') || lowerText.includes('тренировка') || 
      lowerText.includes('бег') || lowerText.includes('exercise') || 
      lowerText.includes('gym') || lowerText.includes('workout') || 
      lowerText.includes('run')) {
    return 'Здоровье';
  }
  
  return 'Другое';
};

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [categories, setCategories] = useState<string[]>(['Работа', 'Покупки', 'Образование', 'Здоровье', 'Другое']);

  // Функция для добавления новой категории
  const addCategory = (newCategory: string) => {
    if (newCategory.trim() !== '' && !categories.includes(newCategory.trim())) {
      setCategories([...categories, newCategory.trim()]);
      return true;
    }
    return false;
  };

  const addTodo = (text: string, category: string = '', importance: TodoImportance = TodoImportance.MEDIUM) => {
    if (text.trim() !== '') {
      // Если категория не указана, определяем автоматически
      const finalCategory = category || classifyTask(text);
      
      // Добавляем новую категорию, используя существующую функцию addCategory
      if (!categories.includes(finalCategory)) {
        addCategory(finalCategory);
      }
      
      const newTodo: Todo = {
        id: Date.now(),
        text,
        completed: false,
        status: TodoStatus.ACTIVE,
        category: finalCategory,
        importance,
        createdAt: new Date()
      }
      setTodos([...todos, newTodo]);
    }
  }

  const toggleTodo: TodoToggleHandler = (id: number) => {
    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          const newStatus = todo.status === TodoStatus.COMPLETED ? TodoStatus.ACTIVE : TodoStatus.COMPLETED;
          return { 
            ...todo, 
            completed: newStatus === TodoStatus.COMPLETED,
            status: newStatus
          };
        }
        return todo;
      })
    );
  }

  const deleteTodo: TodoDeleteHandler = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  }
  
  const cancelTodo: TodoCancelHandler = (id: number) => {
    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          return { 
            ...todo, 
            cancelled: true,
            status: TodoStatus.CANCELLED
          };
        }
        return todo;
      })
    );
  }

  // Function to reorder todos within a category
  const reorderTodo: TodoReorderHandler = (sourceIndex: number, destinationIndex: number, categoryName: string) => {
    const categoryTodos = todos.filter(todo => todo.category === categoryName);
    const otherTodos = todos.filter(todo => todo.category !== categoryName);
    
    const [removed] = categoryTodos.splice(sourceIndex, 1);
    categoryTodos.splice(destinationIndex, 0, removed);
    
    setTodos([...otherTodos, ...categoryTodos]);
  };

  // Function to move a todo to a different category
  const changeTodoCategory: TodoCategoryChangeHandler = (id: number, newCategory: string) => {
    setTodos(
      todos.map(todo => 
        todo.id === id ? { ...todo, category: newCategory } : todo
      )
    );
  };
  
  // Function to change task importance
  const changeImportance: TodoImportanceChangeHandler = (id: number, importance: TodoImportance) => {
    setTodos(
      todos.map(todo => 
        todo.id === id ? { ...todo, importance } : todo
      )
    );
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 py-6 sm:py-10 px-2 sm:px-4 pb-20">
        <div className="max-w-lg sm:max-w-2xl mx-auto">
          <Header 
            title="Только подумай" 
          />
          
          <main className="my-6 sm:my-8">
            <Routes>
              <Route path="/" element={
                <ProfilePage 
                  todos={todos}
                />
              } />
              <Route path="/tasks" element={
                <TasksList 
                  todos={todos}
                  categories={categories}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                  onCancel={cancelTodo}
                  onReorder={reorderTodo}
                  onChangeCategory={changeTodoCategory}
                  onChangeImportance={changeImportance}
                  onAdd={addTodo}
                  onAddCategory={addCategory}
                />
              } />
              <Route path="/add" element={
                <AddTaskPage 
                  todos={todos}
                  categories={categories}
                  onAdd={addTodo}
                  onAddCategory={addCategory}
                  suggestCategory={classifyTask}
                />
              } />
            </Routes>
          </main>
        </div>
        
        <Navigation />
      </div>
    </Router>
  )
}

export default App
