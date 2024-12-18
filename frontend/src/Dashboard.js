import React, { useState, useEffect, useRef } from 'react';
import Sidebar from './components/Sidebar.js';
import { Link } from 'react-router-dom';

// Card component with link to TopicDetailsPage
const Card = ({ title, subject }) => (
  <Link to={`/learn/subject/${encodeURIComponent(subject)}/topic/${encodeURIComponent(title)}`}>
    <div className="bg-gray-200 p-4 rounded w-40 h-40 flex-shrink-0 flex items-center justify-center hover:scale-110 hover:bg-gray-400 transition-transform transition-colors duration-300">
      <span className="text-black">{title}</span>
    </div>
  </Link>
);

const SubjectCard = ({ title, topics }) => {
  const scrollRef = useRef(null);

  return (
    <div className="bg-white p-6 rounded-lg shadow mb-8">
      <Link to={`/learn/subject/${encodeURIComponent(title)}`}>
        <h2 className="text-xl font-bold mb-4 hover:text-blue-500 transition-colors duration-300">
          {title}
        </h2>
      </Link>

      <div className="relative">
        {/* Scrollable Topic Cards */}
        <div ref={scrollRef} className="flex overflow-x-auto space-x-4 scrollbar-hide">
          {topics && topics.length > 0 ? (
            topics.map((topic, index) => (
              // Pass both topic name and subject name to the card for linking
              <Card key={index} title={topic.name} subject={title} />
            ))
          ) : (
            <div className="text-gray-500">No topics available</div>
          )}
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [subjects, setSubjects] = useState([]); // State to hold subjects
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        setLoading(true); // Start loading
        const response = await fetch('http://localhost:5050/api/subjects'); // Fetch subjects from the backend
        if (!response.ok) {
          throw new Error('Failed to fetch subjects');
        }
        const data = await response.json();
        setSubjects(data); // Update the state with fetched subjects
      } catch (err) {
        console.error('Error fetching subjects:', err);
        setError(err.message);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchSubjects(); // Fetch data when the component mounts
  }, []);

  // Show loading state
  if (loading) {
    return (
      <div className="flex h-screen overflow-hidden">
        <Sidebar activeItem={'Learn'} />
        <main className="flex-1 p-8 overflow-y-auto">
          <h1 className="text-3xl font-bold mb-8">Topics</h1>
          <p>Loading subjects...</p>
        </main>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="flex h-screen overflow-hidden">
        <Sidebar activeItem={'Learn'} />
        <main className="flex-1 p-8 overflow-y-auto">
          <h1 className="text-3xl font-bold mb-8">Topics</h1>
          <p className="text-red-500">{error}</p>
        </main>
      </div>
    );
  }

  // Show empty state if no subjects
  if (subjects.length === 0) {
    return (
      <div className="flex h-screen overflow-hidden">
        <Sidebar activeItem={'Learn'} />
        <main className="flex-1 p-8 overflow-y-auto">
          <h1 className="text-3xl font-bold mb-8">Topics</h1>
          <p className="text-gray-500">No subjects available. Add a new subject to get started.</p>
          <Link to="/learn/addtopic">
            <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mt-4">
              Add New Topic
            </button>
          </Link>
        </main>
      </div>
    );
  }

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
            <SubjectCard key={index} title={subject.subject} topics={subject.topics || []} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
