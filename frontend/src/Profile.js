import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar.js'; // Make sure this path is correct based on your folder structure

const Profile = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    // Handle the sign out process (clear tokens, session, etc.)
    console.log('Signing out...');
    navigate('/login'); // Redirect to login page after sign-out
  };

  return (
    <div className="flex">
      {/* Sidebar Component */}
      <Sidebar activeItem="Profile" />
      
      {/* Profile Page Content */}
      <div className="flex-grow p-8 bg-white-100 h-screen">
        <h1 className="text-4xl font-bold mb-8">Profile</h1>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold">John Doe</h2>
          <p className="text-white-600">john.doe@example.com</p>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Account Information</h3>
          <p className="text-gray-700">
            Here you can manage your account settings and personal information.
          </p>
        </div>

        {/* Sign Out Button */}
        <button 
          onClick={handleSignOut} 
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Profile;
