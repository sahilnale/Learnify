import React, { useRef } from 'react';
import Sidebar from './components/Sidebar.js';
import { Link } from 'react-router-dom';

// Card component without link
const Card = ({ title }) => (
  <div className="bg-gray-200 p-4 rounded w-40 h-40 flex-shrink-0 flex items-center justify-center hover:scale-110 hover:bg-gray-400 transition-transform transition-colors duration-300">
    <span className="text-black">{title}</span>
  </div>
);

const SubjectCard = ({ title, cards }) => {
  const scrollRef = useRef(null);

  return (
    <div className="bg-white p-6 rounded-lg shadow mb-8">
      {/* Wrap the subject title with a Link */}
      <Link to={`/learn/subject/${title}`}>
        <h2 className="text-xl font-bold mb-4 hover:text-blue-500 transition-colors duration-300">
          {title}
        </h2>
      </Link>

      <div className="relative">
        {/* Scrollable Topic Cards */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto space-x-4 scrollbar-hide"
        >
          {cards.map((cardTitle, index) => (
            <Card key={index} title={cardTitle} />
          ))}
        </div>
      </div>
    </div>
  );
};

const Dashboard = ({ subjects }) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar activeItem={'Learn'} />
      <main className="flex-1 p-8 overflow-y-auto">
        {/* Container for heading and button */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Topics</h1>
          <Link to="/learn/addtopic">
            <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
              Add New Topic
            </button>
          </Link>
        </div>

        {/* Subject Cards */}
        <div className="space-y-8">
          {subjects.map((subject, index) => (
            <SubjectCard key={index} title={subject.subject} cards={subject.topics} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
