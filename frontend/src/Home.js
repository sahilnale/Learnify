// src/Home.js (Dashboard with To-Do List Check/Uncheck, Modal, and Smooth Fade-Out)
import React, { useState } from 'react';
import Sidebar from './components/Sidebar.js';


const Card = ({ title, description }) => (
    <div className="bg-gray-100 p-4 rounded-lg shadow hover:bg-gray-200 transition duration-200">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
);

// Modal component to add a new task
const AddTaskModal = ({ isOpen, onClose, onSave }) => {
    const [newTask, setNewTask] = useState({ title: '', description: '' });

    if (!isOpen) return null; // Do not render the modal if it's not open

    const handleSave = () => {
        if (newTask.title && newTask.description) {
            onSave(newTask);
            setNewTask({ title: '', description: '' }); // Reset after saving
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                <h2 className="text-2xl font-bold mb-4">Add New Task</h2>
                <input
                    type="text"
                    placeholder="Task Title"
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Task Description"
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                />
                <div className="flex justify-end space-x-4">
                    <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={handleSave}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

// Card component for To-Do list with check/uncheck, fading out the item on completion
const TodoCard = ({ title, description, completed, onToggle, isFadingOut }) => (
    <div
        className={`bg-gray-100 p-4 rounded-lg shadow hover:bg-gray-200 transition-all duration-500 ease-in-out flex items-center ${
            completed ? 'bg-green-100' : ''
        } ${isFadingOut ? 'opacity-0' : 'opacity-100'}`} // Apply fade-out effect
    >
        <input type="checkbox" className="mr-4" checked={completed} onChange={onToggle} />
        <div>
            <h3 className={`text-lg font-semibold mb-2 ${completed ? 'line-through text-gray-500' : ''}`}>{title}</h3>
            <p className={`text-gray-600 ${completed ? 'line-through' : ''}`}>{description}</p>
        </div>
    </div>
);

const Home = () => {
    // To-Do List state
    const [todos, setTodos] = useState([
        { id: 1, title: 'Biology', description: 'Complete Chapter 3 by tomorrow.', completed: false, isFadingOut: false },
        { id: 2, title: 'English', description: 'Review notes for the upcoming test.', completed: false, isFadingOut: false },
        { id: 3, title: 'Math', description: 'Submit progress report by Friday.', completed: false, isFadingOut: false },
        { id: 4, title: 'History', description: 'Finish history essay by next week.', completed: false, isFadingOut: false },
        { id: 5, title: 'Science', description: 'Prepare for science fair presentation.', completed: false, isFadingOut: false },
    ]);

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Handle toggling the todo item and apply fade-out effect
    const toggleTodo = (id) => {
        const updatedTodos = todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed, isFadingOut: false } : todo
        );
        setTodos(updatedTodos);

        const selectedTodo = updatedTodos.find((todo) => todo.id === id);

        if (selectedTodo.completed) {
            // Apply fade-out effect after 1 second and then remove after 3 seconds
            setTimeout(() => {
                setTodos((prevTodos) =>
                    prevTodos.map((todo) =>
                        todo.id === id ? { ...todo, isFadingOut: true } : todo
                    )
                );
                setTimeout(() => {
                    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
                }, 2000); // Remove after 2 seconds of fading out
            }, 1000); // Delay before starting fade-out
        }
    };

    // Add a new task
    const addTodo = (newTask) => {
        setTodos([...todos, { id: todos.length + 1, ...newTask, completed: false, isFadingOut: false }]);
        setIsModalOpen(false); // Close modal after adding
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

                    {/* To-Do List with Add Task functionality */}
<section className="bg-white p-6 rounded-lg shadow flex flex-col h-full">
    <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">To-Do List</h2>
        <button
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            onClick={() => setIsModalOpen(true)}
        >
            + 
        </button>
    </div>
    
    {/* Flexible container for scrollable area */}
    <div className="flex-1 overflow-y-auto space-y-4">
        {todos.map((todo) => (
            <TodoCard
                key={todo.id}
                title={todo.title}
                description={todo.description}
                completed={todo.completed}
                isFadingOut={todo.isFadingOut}
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

            {/* Add Task Modal */}
            <AddTaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={addTodo} />
        </div>
    );
};

export default Home;
