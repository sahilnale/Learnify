import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './LandingPage';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import Dashboard from './Dashboard';
import Home from './Home';
import ProgressPage from './ProgressPage';
import Profile from './Profile';
import AddTopic from './AddTopic';
import SubjectDetail from './SubjectDetail';  // Import SubjectDetail

function App() {
  const [subjects, setSubjects] = useState([
    { subject: 'Biology', topics: ['Evolutionary Story of...', 'Ethics of E-Waste', 'Bioremediation', 'Scientific Discoveries'] },
    { subject: 'English 9', topics: ['Defining Self', 'Fact or Fiction?', 'Are We Innocent?', 'Poetry and the People'] },
    { subject: 'Mathematics', topics: ['Algebra', 'Geometry', 'Calculus', 'Statistics'] },
    { subject: 'Physics', topics: ['Classical Mechanics', 'Quantum Physics', 'Electromagnetism', 'Thermodynamics'] },
  ]);

  const addTopic = (newTopic) => {
    setSubjects((prevSubjects) => [...prevSubjects, newTopic]);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/learn" element={<Dashboard subjects={subjects} />} />  {/* Pass subjects to Dashboard */}
        <Route path="/home" element={<Home />} />
        <Route path="/progress" element={<ProgressPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/learn/addtopic" element={<AddTopic addTopic={addTopic} />} />
        <Route path="/learn/subject/:subjectName" element={<SubjectDetail subjects={subjects} />} />  {/* Pass subjects to SubjectDetail */}
      </Routes>
    </Router>
  );
}

export default App;
