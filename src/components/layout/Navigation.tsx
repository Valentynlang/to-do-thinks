import { NavLink } from 'react-router-dom';

const Navigation: React.FC = () => {
  return (
    <nav className="bg-indigo-600 py-3 px-4 mb-6 rounded-lg shadow-md">
      <ul className="flex space-x-4 justify-center">
        <li>
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `px-4 py-2 rounded-md transition-colors ${
                isActive 
                  ? 'bg-white text-indigo-700 font-medium' 
                  : 'text-white hover:bg-indigo-500'
              }`
            }
            end
          >
            Главная
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/add" 
            className={({ isActive }) => 
              `px-4 py-2 rounded-md transition-colors ${
                isActive 
                  ? 'bg-white text-indigo-700 font-medium' 
                  : 'text-white hover:bg-indigo-500'
              }`
            }
          >
            Добавить задачу
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/profile" 
            className={({ isActive }) => 
              `px-4 py-2 rounded-md transition-colors ${
                isActive 
                  ? 'bg-white text-indigo-700 font-medium' 
                  : 'text-white hover:bg-indigo-500'
              }`
            }
          >
            Профиль
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation; 