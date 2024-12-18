import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from './components/Sidebar.js';

const TopicDetailsPage = () => {
  const { subject, topicTitle } = useParams(); // Extract subject and topicTitle from URL
  const [resources, setResources] = useState([]); // State to store topic resources
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for error

  useEffect(() => {
    const fetchTopicDetails = async () => {
      try {
        setLoading(true);

        // Fetch all subjects to find the subject ID
        const subjectResponse = await fetch('http://localhost:5050/api/subjects');
        if (!subjectResponse.ok) {
          throw new Error('Failed to fetch subjects');
        }
        const subjects = await subjectResponse.json();

        // Find the subject matching the name
        const selectedSubject = subjects.find((s) => s.subject === subject);
        if (!selectedSubject) {
          throw new Error(`Subject "${subject}" not found`);
        }

        // Fetch all topics for the subject
        const topicsResponse = await fetch(`http://localhost:5050/api/topics/subject/${selectedSubject._id}`);
        if (!topicsResponse.ok) {
          throw new Error('Failed to fetch topics');
        }
        const topics = await topicsResponse.json();

        // Find the specific topic matching the topicTitle
        const selectedTopic = topics.find((t) => t.name === topicTitle);
        if (!selectedTopic) {
          throw new Error(`Topic "${topicTitle}" not found`);
        }

        setResources(selectedTopic.resources); // Update resources state
      } catch (err) {
        console.error('Error fetching topic details:', err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTopicDetails();
  }, [subject, topicTitle]);

  // Show loading state
  if (loading) {
    return (
      <div className="flex h-screen overflow-hidden">
        <Sidebar activeItem={'Learn'} />
        <main className="flex-1 p-8 overflow-y-auto">
          <h1 className="text-3xl font-bold mb-4">Loading Topic Details...</h1>
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

  // Render topic details
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar activeItem={'Learn'} />

      {/* Main content displaying topic resources */}
      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-4">{topicTitle}</h1>

        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">Resources for {topicTitle}</h2>

          {resources.length > 0 ? (
            <ul className="list-disc ml-6 space-y-2">
              {resources.map((resource, index) => (
                <li key={index} className="text-gray-700">{resource}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No resources available for this topic.</p>
          )}
        </section>
      </main>
    </div>
  );
};

export default TopicDetailsPage;
