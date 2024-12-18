import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Add useNavigate to redirect after registration
import axios from 'axios';  // Import axios for API requests

const RegisterPage = () => {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();  // Hook for navigating to another route

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevents the default form submission behavior
      
        try {
            const registerData = {
                name: userData.name,
                email: userData.email,
                password: userData.password,
            };
            const response = await axios.post('http://localhost:5050/api/auth/register', registerData);
            console.log('Registered successfully:', response.data);
    
            setSuccess(true); // Indicate success
            setError(''); // Clear any error messages
    
            setTimeout(() => navigate('/login'), 2000); // Redirect to login page after 2 seconds
        } catch (error) {
            console.error('Error registering:', error);
            setError(error.response?.data?.message || 'Registration failed. Please try again.');
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
                    {/* Register Form and Image Section */}
                    <div className="flex w-full">
                        {/* Form Section */}
                        <div className="w-1/2 flex flex-col items-start justify-center p-8">
                            <h2 className="text-3xl mb-6 font-normal">Register</h2>
                            {/* Display success or error message */}
                            {success && <p className="text-green-500">Registration successful! Redirecting to login...</p>}
                            {error && <p className="text-red-500">{error}</p>}
                            
                            <form className="w-full" onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Full Name........"
                                        value={userData.name}
                                        onChange={handleChange}
                                        className="w-full p-3 border border-gray-400 rounded"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email........"
                                        value={userData.email}
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
                                        value={userData.password}
                                        onChange={handleChange}
                                        className="w-full p-3 border border-gray-400 rounded"
                                        required
                                    />
                                </div>
                                <button className="w-full bg-black text-white p-3 rounded shadow-md hover:bg-gray-800" type="submit">
                                    Register
                                </button>
                            </form>
                            <p className="mt-6 text-gray-700">
                                Already have an account?{' '}
                                <Link to="/login" className="font-bold text-black">
                                    Login
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

export default RegisterPage;
