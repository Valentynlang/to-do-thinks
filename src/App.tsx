import { useState } from 'react'
import TodoList from './components/TodoList'
import TodoForm from './components/TodoForm'

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  category: string;
}

// Fake AI classification function (will be replaced with more sophisticated logic later)
const classifyTask = (text: string): string => {
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

  const addTodo = (text: string) => {
    if (text.trim() !== '') {
      const category = classifyTask(text);
      
      // Add new category if it doesn't exist already
      if (!categories.includes(category)) {
        setCategories([...categories, category]);
      }
      
      const newTodo: Todo = {
        id: Date.now(),
        text,
        completed: false,
        category
      }
      setTodos([...todos, newTodo]);
    }
  }

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  // Function to reorder todos within a category
  const reorderTodo = (sourceIndex: number, destinationIndex: number, categoryName: string) => {
    const categoryTodos = todos.filter(todo => todo.category === categoryName);
    const otherTodos = todos.filter(todo => todo.category !== categoryName);
    
    const [removed] = categoryTodos.splice(sourceIndex, 1);
    categoryTodos.splice(destinationIndex, 0, removed);
    
    setTodos([...otherTodos, ...categoryTodos]);
  };

  // Function to move a todo to a different category
  const changeTodoCategory = (id: number, newCategory: string) => {
    setTodos(
      todos.map(todo => 
        todo.id === id ? { ...todo, category: newCategory } : todo
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-indigo-50 py-8 px-4">
      <div className="max-w-lg mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-indigo-700 mb-2">To-Do Thinks</h1>
          <p className="text-indigo-500">Умный список задач с AI-сортировкой</p>
        </header>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
          <div className="p-6">
            <TodoForm onAdd={addTodo} />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-700">Ваши задачи</h2>
              <div className="text-sm text-gray-500">
                Всего: {todos.length} | Выполнено: {todos.filter(t => t.completed).length}
              </div>
            </div>
            
            <div className="mb-4 bg-blue-50 p-3 rounded text-sm text-blue-700">
              <p className="font-medium">Подсказка:</p>
              <ul className="list-disc list-inside mt-1">
                <li>Свайп вправо - отметить выполненной</li>
                <li>Свайп влево - удалить задачу</li>
                <li>Перетаскивайте задачи для изменения порядка</li>
              </ul>
            </div>
            
            <TodoList 
              todos={todos} 
              categories={categories}
              onToggle={toggleTodo} 
              onDelete={deleteTodo}
              onReorder={reorderTodo}
              onChangeCategory={changeTodoCategory}
            />
          </div>
        </div>
        
        <footer className="mt-8 text-center text-sm text-gray-500">
          <p>© 2023 To-Do Thinks | Умный список задач</p>
        </footer>
      </div>
    </div>
  )
}

export default App
