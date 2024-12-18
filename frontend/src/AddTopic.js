import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';

const AddTopic = () => {
  const [subjectName, setSubjectName] = useState('');
  const [topicName, setTopicName] = useState('');
  const [duration, setDuration] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    console.log('Form values on submit:', {
      subjectName,
      topicName,
      duration,
      userId: localStorage.getItem('userId'),
    });
    e.preventDefault();

    const userId = localStorage.getItem('userId'); // Retrieve the user ID from localStorage
    console.log('User ID:', userId); // Debugging

    if (subjectName && topicName && duration && userId) {
      try {
        // Step 1: Create the subject
        const subjectResponse = await fetch('http://localhost:5050/api/subjects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            subject: subjectName,
            userId,
            topicIds: [], // Create the subject with no topics initially
          }),
        });

        if (!subjectResponse.ok) {
          const errorData = await subjectResponse.json();
          console.error('Error creating subject:', errorData);
          throw new Error('Failed to create subject');
        }

        const newSubject = await subjectResponse.json();
        console.log('Created Subject:', newSubject);

        // Step 2: Create the topic and link it to the subject
        const topicResponse = await fetch('http://localhost:5050/api/topics', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: topicName,
            resources: [`Duration: ${duration}`],
            subjectId: newSubject._id, // Link the topic to the newly created subject
          }),
        });

        if (!topicResponse.ok) {
          const errorData = await topicResponse.json();
          console.error('Error creating topic:', errorData);
          throw new Error('Failed to create topic');
        }

        const newTopic = await topicResponse.json();
        console.log('Created Topic:', newTopic);

        // Navigate to the Learn page after successful creation
        navigate('/learn');
      } catch (error) {
        console.error('Error creating subject or topic:', error.message);
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
          {/* Subject Name Input */}
          <div>
            <label className="block text-lg font-semibold mb-2" htmlFor="subjectName">
              Subject Name
            </label>
            <input
              type="text"
              id="subjectName"
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded"
              placeholder="Enter subject name"
              required
            />
          </div>

          {/* Topic Name Input */}
          <div>
            <label className="block text-lg font-semibold mb-2" htmlFor="topicName">
              Topic Name
            </label>
            <input
              type="text"
              id="topicName"
              value={topicName}
              onChange={(e) => setTopicName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded"
              placeholder="Enter topic name"
              required
            />
          </div>

          {/* Duration Dropdown */}
          <div>
            <label className="block text-lg font-semibold mb-2" htmlFor="duration">
              Duration
            </label>
            <select
              id="duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded"
              required
            >
              <option value="">Select duration</option>
              {durationOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Topic
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTopic;
