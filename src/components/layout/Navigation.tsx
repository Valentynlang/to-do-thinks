import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaPlus, FaUser } from 'react-icons/fa';

const Navigation: React.FC = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-md py-2 px-4 z-10">
      <ul className="max-w-lg sm:max-w-2xl mx-auto flex justify-around items-center">
        <li className="relative">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `mobile-nav-link ${isActive ? 'mobile-nav-link-active' : 'mobile-nav-link-inactive'}`
            }
            end
          >
              <>
                <FaUser className="mobile-nav-icon" />
                <span className="text-xs hidden sm:block">Профиль</span>
              </>
            
          </NavLink>
        </li>
        <li className="relative">
          <NavLink 
            to="/add" 
            className={({ isActive }) => 
              `mobile-nav-link ${isActive ? 'mobile-nav-link-active' : 'mobile-nav-link-inactive'}`
            }
          >


                  <>
                    <FaPlus className={`mobile-nav-icon`} />
                    <span className="text-xs hidden sm:block">Добавить</span>
                  </>

            
          </NavLink>
        </li>
        <li className="relative">
          <NavLink 
            to="/tasks" 
            className={({ isActive }) => 
              `mobile-nav-link ${isActive ? 'mobile-nav-link-active' : 'mobile-nav-link-inactive'}`
            }
          >

              <>
                <FaHome className="mobile-nav-icon" />
                <span className="text-xs hidden sm:block">Задачи</span>
              </>
            
          </NavLink>
        </li>

      </ul>
    </nav>
  );
};

export default Navigation; 