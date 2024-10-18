import React from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from './components/Sidebar.js';

const TopicDetailsPage = ({ subjects }) => {
  const { subject, topicTitle } = useParams();

  // Find the subject and topic resources
  const selectedSubject = subjects.find((s) => s.subject === subject);
  const selectedTopic = selectedSubject ? selectedSubject.topics.find((topic) => topic.name === topicTitle) : null;

  if (!selectedSubject || !selectedTopic) {
    return <div>Topic not found</div>;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar activeItem={'Learn'} />

      {/* Main content displaying topic resources */}
      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-4">{topicTitle}</h1>

        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">Resources for {topicTitle}</h2>

          {selectedTopic.resources.length > 0 ? (
            <ul className="list-disc ml-6 space-y-2">
              {selectedTopic.resources.map((resource, index) => (
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
