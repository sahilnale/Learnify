// src/Home.js (Dashboard with To-Do List Check/Uncheck)
import React, { useState } from 'react';
import Sidebar from './components/Sidebar.js';

// Card component for To-Do list with check/uncheck
const TodoCard = ({ title, description, completed, onToggle }) => (
    <div className={`bg-gray-100 p-4 rounded-lg shadow hover:bg-gray-200 transition duration-200 flex items-center ${completed ? 'bg-green-100' : ''}`}>
        <input
            type="checkbox"
            className="mr-4"
            checked={completed}
            onChange={onToggle}
        />
        <div>
            <h3 className={`text-lg font-semibold mb-2 ${completed ? 'line-through text-gray-500' : ''}`}>
                {title}
            </h3>
            <p className={`text-gray-600 ${completed ? 'line-through' : ''}`}>
                {description}
            </p>
        </div>
    </div>
);

// General card component for other sections (without check/uncheck)
const Card = ({ title, description }) => (
    <div className="bg-gray-100 p-4 rounded-lg shadow hover:bg-gray-200 transition duration-200">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
);

const Home = () => {
    // To-Do List state
    const [todos, setTodos] = useState([
        { id: 1, title: 'Biology', description: 'Complete Chapter 3 by tomorrow.', completed: false },
        { id: 2, title: 'English', description: 'Review notes for the upcoming test.', completed: false },
        { id: 3, title: 'Math', description: 'Submit progress report by Friday.', completed: false },
    ]);

    // Toggle completion of a to-do item
    const toggleTodo = (id) => {
        setTodos(
            todos.map(todo =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    return (
        <div className="flex h-screen">
            {/* Fixed Sidebar */}
            <Sidebar activeItem={'Home'} />

            {/* Main Content with Scrollable Area */}
            <main className="flex-1 p-8 overflow-y-auto">
                {/* Welcome User */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-4xl font-bold">Welcome, User!</h1>
                        <p className="text-gray-600">Here’s a quick summary of your learning journey so far.</p>
                    </div>
                    <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
                        Add New Task
                    </button>
                </div>

                {/* Grid Layout for Dashboard Summary */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Progress Overview */}
                    <section className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-2xl font-bold mb-4">Progress Overview</h2>
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-lg">Biology</h3>
                                <div className="w-full bg-gray-300 rounded-full h-4">
                                    <div className="bg-green-500 h-4 rounded-full" style={{ width: '70%' }}></div>
                                </div>
                                <p className="text-gray-500 text-sm">70% completed</p>
                            </div>
                            <div>
                                <h3 className="text-lg">English</h3>
                                <div className="w-full bg-gray-300 rounded-full h-4">
                                    <div className="bg-blue-500 h-4 rounded-full" style={{ width: '50%' }}></div>
                                </div>
                                <p className="text-gray-500 text-sm">50% completed</p>
                            </div>
                            <div>
                                <h3 className="text-lg">Math</h3>
                                <div className="w-full bg-gray-300 rounded-full h-4">
                                    <div className="bg-red-500 h-4 rounded-full" style={{ width: '30%' }}></div>
                                </div>
                                <p className="text-gray-500 text-sm">30% completed</p>
                            </div>
                        </div>
                    </section>

                    {/* To-Do List with Check/Uncheck functionality */}
                    <section className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-2xl font-bold mb-4">To-Do List</h2>
                        <div className="space-y-4">
                            {todos.map(todo => (
                                <TodoCard
                                    key={todo.id}
                                    title={todo.title}
                                    description={todo.description}
                                    completed={todo.completed}
                                    onToggle={() => toggleTodo(todo.id)}
                                />
                            ))}
                        </div>
                    </section>

                    {/* Recent Activity as Cards */}
                    <section className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
                        <div className="space-y-4">
                            <Card title="Completed Quiz 1 in English" description="Score: 85%" />
                            <Card title="Watched Biology Lecture" description="Evolutionary Story of Life" />
                            <Card title="Submitted Math Assignment" description="Algebra practice problems." />
                        </div>
                    </section>

                    {/* Learning Goals as Cards */}
                    <section className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-2xl font-bold mb-4">Learning Goals</h2>
                        <div className="space-y-4">
                            <Card title="Biology" description="Complete 2 chapters by Friday." />
                            <Card title="English" description="Finish reading assigned novel by next week." />
                            <Card title="Math" description="Improve quiz score by 20%." />
                        </div>
                    </section>

                    {/* Recommended Topics as Cards */}
                    <section className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-2xl font-bold mb-4">Recommended Topics</h2>
                        <div className="space-y-4">
                            <Card title="Quantum Mechanics" description="Introduction to the concepts of quantum theory." />
                            <Card title="English Grammar" description="Advanced English Grammar and Composition." />
                            <Card title="Data Structures" description="Learn Data Structures and Algorithms in Python." />
                        </div>
                    </section>

                    {/* Notifications */}
                    <section className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-2xl font-bold mb-4">Notifications</h2>
                        <p className="text-gray-500">No new notifications at this moment.</p>
                    </section>
                </div>
            </main>
        </div>
    );
};

export default Home;
