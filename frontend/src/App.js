import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SubjectProvider } from './SubjectContext';
import LandingPage from './LandingPage';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import Dashboard from './Dashboard';
import Home from './Home';
import ProgressPage from './ProgressPage';
import Profile from './Profile';
import AddTopic from './AddTopic';
import SubjectDetail from './SubjectDetail';
import TopicDetailsPage from './TopicDetailsPage';

function App() {
  return (
    <SubjectProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/learn" element={<Dashboard />} />
          <Route path="/home" element={<Home />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/learn/addtopic" element={<AddTopic />} />
          <Route path="/learn/subject/:subjectName" element={<SubjectDetail />} />
          <Route path="/learn/subject/:subject/topic/:topicTitle" element={<TopicDetailsPage />} />
        </Routes>
      </Router>
    </SubjectProvider>
  );
}

export default App;
