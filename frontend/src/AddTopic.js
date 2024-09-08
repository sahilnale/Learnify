import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar'; // Adjust the path based on your structure

const AddTopic = ({ addTopic }) => {
  const [subject, setSubject] = useState('');
  const [duration, setDuration] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (subject && duration) {
      // Call the addTopic function passed as a prop to add the new topic
      addTopic({ subject, duration });
      navigate('/learn'); // Navigate to the Learn view after adding the topic
    } else {
      alert('Please fill in all fields');
    }
  };

  // Dropdown options for duration (from 1 day to 1 year)
  const durationOptions = [
    { value: '1 day', label: '1 day' },
    { value: '1 week', label: '1 week' },
    { value: '2 weeks', label: '2 weeks' },
    { value: '1 month', label: '1 month' },
    { value: '3 months', label: '3 months' },
    { value: '6 months', label: '6 months' },
    { value: '9 months', label: '9 months' },
    { value: '1 year', label: '1 year' },
  ];

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar activeItem="Learn" />
      
      {/* Add Topic Form */}
      <div className="flex-grow p-8 bg-white h-screen">
        <h1 className="text-4xl font-bold mb-8">Add a Topic</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-semibold mb-2" htmlFor="subject">
              Subject
            </label>
            <input 
              type="text" 
              id="subject"
              value={subject} 
              onChange={(e) => setSubject(e.target.value)} 
              className="w-full p-3 border border-gray-300 rounded"
              placeholder="Enter the subject"
              required
            />
          </div>

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
