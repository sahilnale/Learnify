// src/RegisterPage.js
import React from 'react';
import { Link } from 'react-router-dom'; // Make sure this import is added


const RegisterPage = () => {
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
                            <form className="w-full">
                                <div className="mb-4">
                                    <input
                                        type="text"
                                        placeholder="Full Name........"
                                        className="w-full p-3 border border-gray-400 rounded"
                                    />
                                </div>
                                <div className="mb-4">
                                    <input
                                        type="email"
                                        placeholder="Email........"
                                        className="w-full p-3 border border-gray-400 rounded"
                                    />
                                </div>
                                <div className="mb-6">
                                    <input
                                        type="password"
                                        placeholder="Password........"
                                        className="w-full p-3 border border-gray-400 rounded"
                                    />
                                </div>
                                <button className="w-full bg-black text-white p-3 rounded shadow-md hover:bg-gray-800">
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
