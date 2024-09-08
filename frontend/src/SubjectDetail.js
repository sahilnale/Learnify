import React from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from './components/Sidebar.js';

const SubjectDetail = ({ subjects }) => {
  const { subjectName } = useParams();  // Get the subject name from URL
  const subject = subjects.find((s) => s.subject === subjectName);  // Find the subject based on URL param

  if (!subject) {
    return <div>Subject not found</div>;
  }

  return (
    <div className="flex h-screen">
      <Sidebar activeItem="Learn" />
      <div className="flex-grow p-8 bg-white h-screen">
        <h1 className="text-4xl font-bold mb-8">{subject.subject}</h1>

        {/* Display topics in a simple list */}
        <ul className="list-disc list-inside space-y-4">
          {subject.topics.map((topic, index) => (
            <li key={index} className="text-lg text-gray-700">
              {topic}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SubjectDetail;
