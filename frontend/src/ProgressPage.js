// src/ProgressPage.js

import React from 'react';
import Sidebar from './components/Sidebar.js';
import './Heatmap.css'; // Import the CSS for heatmap styling

const generateStreakData = () => {
    return Array(365).fill().map(() => Math.floor(Math.random() * 5)); // Random streak count between 0-4
};

const Heatmap = () => {
    const streakData = generateStreakData();

    return (
        <div className="max-w-4xl mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <div className="text-xl font-semibold">
                    191 submissions in the past year <i className="fas fa-info-circle text-gray-400"></i>
                </div>
                <div className="text-sm text-gray-600">
                    <span>Total active days: 33</span>
                    <span className="ml-4">Max streak: 5</span>
                </div>
            </div>

            {/* Scrollable container for the heatmap */}
            <div className="grid-container-wrapper">
                {/* Heatmap */}
                <div className="grid-container">
                    {streakData.map((activity, index) => (
                        <div
                            key={index}
                            className={`grid-item ${activity > 0 ? `active-${activity}` : ''}`}
                        />
                    ))}

                    {/* Insert column gaps after each month */}
                    <div className="month-gap"></div>
                </div>
            </div>
        </div>
    );
};

const ProgressBar = ({ percentage }) => {
    return (
        <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${percentage}%` }}></div>
        </div>
    );
};

const ProgressPage = () => {
    const inProgressSubjects = [
        { title: 'Biology', percentage: 70 },
        { title: 'English', percentage: 50 },
        { title: 'Math', percentage: 30 },
    ];

    const completedSubjects = ['History', 'Physics', 'Computer Science'];
    const earnedBadges = ['3-Day Streak', 'Completed Biology', 'Scored 90% in Math'];

    return (
        <div className="flex h-screen">
            <Sidebar activeItem={'Progress'} />

            <main className="flex-1 p-8 overflow-y-auto">
                <h2 className="text-3xl font-bold mb-6">Your Learning Heatmap</h2>

                {/* Heatmap */}
                <div className="bg-white p-6 rounded-lg shadow mb-6">
                    <Heatmap />
                </div>

                {/* In-Progress Subjects */}
                <div className="bg-white p-6 rounded-lg shadow mb-6">
                    <h2 className="text-2xl font-bold mb-4">In-Progress Subjects</h2>
                    <div className="space-y-4">
                        {inProgressSubjects.map((subject, index) => (
                            <div key={index}>
                                <h3 className="text-lg font-semibold mb-2">{subject.title}</h3>
                                <ProgressBar percentage={subject.percentage} />
                                <p className="text-gray-500 text-sm mt-1">{subject.percentage}% completed</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Completed Subjects */}
                <div className="bg-white p-6 rounded-lg shadow mb-6">
                    <h2 className="text-2xl font-bold mb-4">Completed Subjects</h2>
                    <div className="space-y-2">
                        {completedSubjects.map((subject, index) => (
                            <p key={index} className="text-gray-600">
                                {subject}
                            </p>
                        ))}
                    </div>
                </div>

                {/* Badges Earned */}
                <div className="bg-white p-6 rounded-lg shadow mb-6">
                    <h2 className="text-2xl font-bold mb-4">Badges Earned</h2>
                    <div className="flex flex-wrap">
                        {earnedBadges.map((badge, index) => (
                            <span
                                key={index}
                                className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded"
                            >
                                {badge}
                            </span>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ProgressPage;
