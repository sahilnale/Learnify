import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Sidebar from './components/Sidebar.js';

const SubjectDetail = () => {
  const { subjectName } = useParams(); // Get subject name from URL
  const [topics, setTopics] = useState([]); // State to store topics
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        setLoading(true);

        // Fetch all subjects to find the correct one
        const subjectResponse = await fetch(`http://localhost:5050/api/subjects`);
        if (!subjectResponse.ok) {
          throw new Error('Failed to fetch subjects');
        }
        const subjects = await subjectResponse.json();

        // Find the subject by name
        const subject = subjects.find((s) => s.subject === subjectName);
        if (!subject) {
          throw new Error(`Subject with name "${subjectName}" not found`);
        }

        // Fetch topics using the subject ID
        const topicsResponse = await fetch(`http://localhost:5050/api/topics/subject/${subject._id}`);
        if (!topicsResponse.ok) {
          throw new Error('Failed to fetch topics');
        }
        const topicsData = await topicsResponse.json();
        setTopics(topicsData); // Update topics state
      } catch (err) {
        console.error('Error fetching topics:', err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, [subjectName]);

  // Show loading state
  if (loading) {
    return (
      <div className="flex h-screen overflow-hidden">
        <Sidebar activeItem={'Learn'} />
        <main className="flex-1 p-8 overflow-y-auto">
          <h1 className="text-3xl font-bold mb-4">Loading Topics...</h1>
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
          <h1 className="text-3xl font-bold mb-4">Error</h1>
          <p className="text-red-500">{error}</p>
        </main>
      </div>
    );
  }

  // Render topics
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar activeItem={'Learn'} />
      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-4">{subjectName}</h1>
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">Topics in {subjectName}</h2>
          <ul className="list-disc ml-6 space-y-2">
            {topics.length > 0 ? (
              topics.map((topic, index) => (
                <li key={index}>
                  <Link
                    to={`/learn/subject/${encodeURIComponent(subjectName)}/topic/${encodeURIComponent(topic.name)}`}
                  >
                    <span className="text-blue-500 hover:underline">{topic.name}</span>
                  </Link>
                </li>
              ))
            ) : (
              <div className="text-gray-500">No topics available</div>
            )}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default SubjectDetail;
