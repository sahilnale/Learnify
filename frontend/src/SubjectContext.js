import React, { createContext, useState, useEffect } from 'react';

export const SubjectContext = createContext();

export const SubjectProvider = ({ children }) => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch subjects from the backend
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await fetch('http://localhost:5050/api/subjects');
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setSubjects(data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch subjects:', err);
        setError('Failed to load subjects. Please try again later.');
        setLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  // Add a new topic
  const addTopic = async (subjectId, topic) => {
    try {
      const response = await fetch('http://localhost:5050/api/topics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: topic.name,
          resources: topic.resources,
          subjectId, // Link to the subject
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const newTopic = await response.json();

      // Update the subjects state
      setSubjects((prevSubjects) =>
        prevSubjects.map((subject) =>
          subject._id === subjectId
            ? { ...subject, topics: [...subject.topics, newTopic] }
            : subject
        )
      );
    } catch (err) {
      console.error('Failed to add a topic:', err);
      setError('Failed to add topic. Please try again.');
    }
  };

  return (
    <SubjectContext.Provider value={{ subjects, loading, error, addTopic }}>
      {children}
    </SubjectContext.Provider>
  );
};
