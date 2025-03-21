import { useState } from 'react'
import { Header, Footer, TasksSection } from './components/layout'
import { Todo, TaskClassifier, TodoToggleHandler, TodoDeleteHandler, TodoAddHandler, TodoReorderHandler, TodoCategoryChangeHandler } from './types'

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

  const addTodo: TodoAddHandler = (text: string) => {
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

  const toggleTodo: TodoToggleHandler = (id: number) => {
    setTodos(
      todos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const deleteTodo: TodoDeleteHandler = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-indigo-50 py-8 px-4">
      <div className="max-w-lg mx-auto">
        <Header 
          title="To-Do Thinks" 
          subtitle="Умный список задач с AI-сортировкой" 
        />
        

        
        <TasksSection
          todos={todos}
          categories={categories}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onReorder={reorderTodo}
          onChangeCategory={changeTodoCategory}
          onAdd={addTodo}
        />
        
        <Footer year={2025} />
      </div>
    </div>
  )
}

export default App
