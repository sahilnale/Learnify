import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';  // Replace with your backend URL

// Register User
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error.response.data);
    throw error.response.data;
  }
};

// Login User
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error.response.data);
    throw error.response.data;
  }
};
