import { useState } from 'react'

interface TodoFormProps {
  onAdd: (text: string) => void
}

const TodoForm: React.FC<TodoFormProps> = ({ onAdd }) => {
  const [text, setText] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (text.trim()) {
      onAdd(text)
      setText('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex flex-col">
        <h2 className="text-lg font-medium mb-2 text-gray-700">
          Добавить новую задачу
        </h2>
        <p className="text-sm text-gray-500 mb-3">
          Просто введите свою задачу, и AI автоматически определит категорию
        </p>
        <div className="flex items-center bg-gray-50 rounded-lg overflow-hidden border focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-transparent">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="appearance-none bg-transparent border-none w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none"
            placeholder="Например: Купить молоко или Подготовить презентацию..."
          />
          <button
            type="submit"
            className="flex-shrink-0 bg-indigo-500 hover:bg-indigo-700 text-white py-3 px-6 font-medium rounded-r"
          >
            Добавить
          </button>
        </div>
      </div>
    </form>
  )
}

export default TodoForm 