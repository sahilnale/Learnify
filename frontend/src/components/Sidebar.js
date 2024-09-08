import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ activeItem }) => (
  <aside className="w-1/5 bg-gray-100 p-4 h-screen flex flex-col justify-between">
    <div>
      <div className="flex items-center mb-8">
        <i className="fas fa-bars text-xl mr-4"></i>
        <span className="text-3xl font-bold">Edu.io</span>
      </div>
      <nav>
        <ul>
          <Link to="/home">
            <li className={`mb-4 flex items-center ${activeItem === 'Home' ? 'bg-black text-white p-2 rounded' : 'hover:bg-gray-300 p-2 rounded'}`}>
              <i className="fas fa-university text-lg mr-4"></i>
              <span>Home</span>
            </li>
          </Link>
          <Link to="/learn">
            <li className={`mb-4 flex items-center ${activeItem === 'Learn' ? 'bg-black text-white p-2 rounded' : 'hover:bg-gray-300 p-2 rounded'}`}>
              <i className="far fa-calendar-alt text-lg mr-4"></i>
              <span>Learn</span>
            </li>
          </Link>
          <Link to="/progress">
            <li className={`mb-4 flex items-center ${activeItem === 'Progress' ? 'bg-black text-white p-2 rounded' : 'hover:bg-gray-300 p-2 rounded'}`}>
              <i className="fas fa-chart-line text-lg mr-4"></i>
              <span>Progress</span>
            </li>
          </Link>
        </ul>
      </nav>
    </div>

    <div>
      <Link to="/profile">
        <div className={`flex items-center p-2 ${activeItem === 'Profile' ? 'bg-black text-white rounded' : 'hover:bg-gray-300 rounded'}`}>
          <img src="/img/avatar.png" alt="Profile" className="w-8 h-8 rounded-full mr-4" /> {/* Add your avatar image */}
          <span>Account</span>
        </div>
      </Link>
    </div>
  </aside>
);

export default Sidebar;
