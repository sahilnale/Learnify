import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Add useNavigate to handle navigation
import axios from 'axios';  // Import Axios for making API requests

const LoginPage = () => {
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    });

    const [error, setError] = useState('');
    const navigate = useNavigate();  // Hook for navigating to another route

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send POST request to your backend for login
            const response = await axios.post('http://localhost:5050/api/auth/login', loginData);
            console.log('User logged in:', response.data);

            // Handle successful login (e.g., store token and navigate)
            localStorage.setItem('token', response.data.token); // Store JWT token (if applicable)
            
            // Redirect to dashboard or another page after successful login
            navigate('/home');
        } catch (error) {
            console.error('Error logging in:', error);
            setError(error.response?.data?.message || 'Invalid login credentials. Please try again.');
        }
    };

    return (
        <div className="bg-white flex items-center justify-center min-h-screen">
            <div className="flex items-center justify-center w-full max-w-4xl mx-auto">
                <div className="flex flex-col w-full">
                    {/* Edu.io Logo moved to top-right */}
                    <div className="w-full flex justify-left p-8">
                        <Link to="/"> 
                            <h1 className="text-5xl font-bold text-black">Edu.io</h1>
                        </Link> 
                    </div>
                    {/* Login Form and Image Section */}
                    <div className="flex w-full">
                        {/* Form Section */}
                        <div className="w-1/2 flex flex-col items-start justify-center p-8">
                            <h2 className="text-3xl mb-6 font-normal">Login</h2>
                            {/* Display error message if any */}
                            {error && <p className="text-red-500">{error}</p>}

                            <form className="w-full" onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email........"
                                        value={loginData.email}
                                        onChange={handleChange}
                                        className="w-full p-3 border border-gray-400 rounded"
                                        required
                                    />
                                </div>
                                <div className="mb-6">
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Password........"
                                        value={loginData.password}
                                        onChange={handleChange}
                                        className="w-full p-3 border border-gray-400 rounded"
                                        required
                                    />
                                </div>
                                <button className="w-full bg-black text-white p-3 rounded shadow-md hover:bg-gray-800" type="submit">
                                    Continue
                                </button>
                            </form>
                            <p className="mt-6 text-gray-700">
                                Don’t Have An Account?{' '}
                                <Link to="/register" className="font-bold text-black">
                                    Register
                                </Link>
                            </p>
                        </div>
                        {/* Image Section */}
                        <div className="w-1/2 flex items-center justify-center">
                            <img
                                src="/img/login.png"
                                alt="Abstract geometric pattern"
                                className="w-3/4"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
