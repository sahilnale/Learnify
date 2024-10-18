import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Sidebar from './components/Sidebar.js';

const SubjectDetail = ({ subjects }) => {
  const { subjectName } = useParams();

  // Find the subject that matches the subjectName
  const subject = subjects.find((s) => s.subject === subjectName);

  if (!subject) {
    return <div>Subject not found</div>;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar activeItem={'Learn'} />
      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-4">{subject.subject}</h1>
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">Topics in {subject.subject}</h2>
          <ul className="list-disc ml-6 space-y-2">
            {subject.topics.map((topic, index) => (
              <li key={index}>
                <Link to={`/learn/subject/${encodeURIComponent(subject.subject)}/topic/${encodeURIComponent(topic.name)}`}>
                  <span className="text-blue-500 hover:underline">{topic.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default SubjectDetail;
