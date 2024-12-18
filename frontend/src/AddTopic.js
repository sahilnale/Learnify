import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';

const AddTopic = () => {
  const [subjectName, setSubjectName] = useState('');
  const [topicName, setTopicName] = useState('');
  const [duration, setDuration] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (subjectName && topicName && duration) {
      try {
        const topicResponse = await fetch('http://localhost:5050/api/topics', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: topicName,
            resources: [`Duration: ${duration}`],
          }),
        });

        if (!topicResponse.ok) throw new Error('Failed to create topic');
        const newTopic = await topicResponse.json();

        const subjectResponse = await fetch('http://localhost:5050/api/subjects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            subject: subjectName,
            topicIds: [newTopic._id],
            userId: localStorage.getItem('userId'), // Dynamically retrieve the user ID
          }),
        });

        if (!subjectResponse.ok) throw new Error('Failed to create subject');
        const newSubject = await subjectResponse.json();

        console.log('Successfully created subject:', newSubject);
        navigate('/learn');
      } catch (error) {
        console.error('Error creating topic or subject:', error);
        alert('An error occurred. Please try again.');
      }
    } else {
      alert('Please fill in all fields');
    }
  };

  const durationOptions = [
    { value: '1 day', label: '1 day' },
    { value: '1 week', label: '1 week' },
    { value: '1 month', label: '1 month' },
    { value: '3 months', label: '3 months' },
    { value: '6 months', label: '6 months' },
    { value: '1 year', label: '1 year' },
  ];

  return (
    <div className="flex">
      <Sidebar activeItem="Learn" />
      <div className="flex-grow p-8 bg-white h-screen">
        <h1 className="text-4xl font-bold mb-8">Add a Topic</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-semibold mb-2" htmlFor="subjectName">Subject</label>
            <input
              type="text"
              id="subjectName"
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-semibold mb-2" htmlFor="topicName">Topic Name</label>
            <input
              type="text"
              id="topicName"
              value={topicName}
              onChange={(e) => setTopicName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-semibold mb-2" htmlFor="duration">Duration</label>
            <select
              id="duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded"
              required
            >
              <option value="">Select duration</option>
              {durationOptions.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Add Topic
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTopic;
