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
import TopicDetailsPage from './TopicDetailsPage';

function App() {
  const [subjects, setSubjects] = useState([
    {
      subject: 'Biology',
      topics: [
        {
          name: 'Evolutionary Story of...',
          resources: ['Biology textbook Chapter 3', 'YouTube: Evolution Basics', 'Research paper: Darwin’s Theory']
        },
        {
          name: 'Ethics of E-Waste',
          resources: ['TED Talk: The Hidden Impact of E-Waste', 'Article: Ethical E-Waste Disposal', 'Documentary: E-Waste Crisis']
        },
        {
          name: 'Bioremediation',
          resources: ['Lecture: Bioremediation 101', 'Case Study: Oil Spills Cleanup', 'Research paper: Microbes in Bioremediation']
        },
        {
          name: 'Scientific Discoveries',
          resources: ['Podcast: Great Scientific Discoveries', 'Book: Discoveries that Changed the World', 'YouTube: Top 10 Scientific Breakthroughs']
        }
      ]
    },
    {
      subject: 'English 9',
      topics: [
        {
          name: 'Defining Self',
          resources: ['Essay: The Journey of Self-Discovery', 'Poem: Invictus by William Ernest Henley', 'Book: The Catcher in the Rye']
        },
        {
          name: 'Fact or Fiction?',
          resources: ['Article: Truth vs. Fiction in Literature', 'Book: In Cold Blood by Truman Capote', 'YouTube: Fact vs Fiction Debate']
        },
        {
          name: 'Are We Innocent?',
          resources: ['Play: The Crucible by Arthur Miller', 'Essay: The Notion of Innocence in Society', 'Movie: To Kill a Mockingbird']
        },
        {
          name: 'Poetry and the People',
          resources: ['Anthology: Best Poems of the 20th Century', 'YouTube: Poetry as Protest', 'Article: The Power of Spoken Word']
        }
      ]
    },
    {
      subject: 'Mathematics',
      topics: [
        {
          name: 'Algebra',
          resources: ['Textbook: Algebra I by John Smith', 'YouTube: Algebra Basics', 'Interactive: Solve Algebra Problems']
        },
        {
          name: 'Geometry',
          resources: ['Geometry Workbook', 'YouTube: Geometry Proofs Tutorial', 'Article: The History of Geometry']
        },
        {
          name: 'Calculus',
          resources: ['Textbook: Calculus Early Transcendentals', 'Khan Academy: Introduction to Limits', 'Lecture: Understanding Derivatives']
        },
        {
          name: 'Statistics',
          resources: ['Book: Statistics for Beginners', 'YouTube: Probability vs Statistics', 'Interactive: Analyzing Data Sets']
        }
      ]
    },
    {
      subject: 'Physics',
      topics: [
        {
          name: 'Classical Mechanics',
          resources: ['Lecture: Newton’s Laws of Motion', 'YouTube: Classical Mechanics Explained', 'Textbook: Physics for Engineers']
        },
        {
          name: 'Quantum Physics',
          resources: ['Book: Quantum Physics for Dummies', 'YouTube: Introduction to Quantum Theory', 'Lecture: Schrödinger’s Cat']
        },
        {
          name: 'Electromagnetism',
          resources: ['Textbook: Electromagnetic Theory', 'Interactive: Electromagnetic Fields Simulator', 'Lecture: Maxwell’s Equations']
        },
        {
          name: 'Thermodynamics',
          resources: ['Lecture: Laws of Thermodynamics', 'Book: Thermodynamics and Statistical Mechanics', 'YouTube: Heat and Work in Thermodynamics']
        }
      ]
    }
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
        {/* Pass the subjects prop to SubjectDetail and TopicDetailsPage */}
        <Route path="/learn/subject/:subjectName" element={<SubjectDetail subjects={subjects} />} />  
        <Route path="/learn/subject/:subject/topic/:topicTitle" element={<TopicDetailsPage subjects={subjects} />} />
      </Routes>
    </Router>
  );
}

export default App;
