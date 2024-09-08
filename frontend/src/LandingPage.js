// src/LandingPage.js
import React from 'react';
import { Link } from 'react-router-dom'; // Make sure this import is added

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center bg-white text-black">
      <header className="w-full text-center py-8">
        <h1 className="text-5xl font-bold text-black">Edu.io</h1>
      </header>
      <main className="w-full flex flex-col items-center">
        <section className="w-full flex flex-col md:flex-row items-center justify-around py-8">
          <div className="text-center md:text-left md:w-1/2 p-4">
            <h2 className="text-4xl font-bold mb-4 text-black">
              Unlock Your Learning Potential...
            </h2>
            <p className="text-lg mb-4 text-gray-700">
              Navigate your learning journey with personalized plans made just for you.
              Tailored to your goals and pace—learning has never been this easy.
            </p>
            <div className="flex justify-center md:justify-start space-x-4">
            <Link to="/login"> 
              <button className="bg-black text-white px-6 py-2 rounded shadow-md">
                Log In
              </button>
            </Link>
            <Link to="/register">
              <button className="bg-black text-white px-6 py-2 rounded shadow-md">
                Sign Up
              </button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 p-4">
            <img
              src="/img/Frame1.png"
              alt="Illustration of an astronaut floating in space"
              className="w-full"
            />
          </div>
        </section>
        <section className="w-full flex flex-col md:flex-row items-center justify-around py-8">
          <div className="md:w-1/2 p-4">
            <img
              src="/img/Artist.png"
              alt="Illustration of a person painting"
              className="w-full"
            />
          </div>
          <div className="text-center md:text-left md:w-1/2 p-4">
            <h2 className="text-4xl font-bold mb-4 text-black">
              Personalized Learning, Tailored Just for You
            </h2>
            <p className="text-lg mb-4 text-gray-700">
              Take control of your education with custom learning plans designed to fit
              your unique goals and pace. Start your journey today and see how easy
              learning can be.
            </p>
            <Link to="/home"> 
                <button className="bg-black text-white px-6 py-2 rounded shadow-md">
                Get Started!
                </button>
              </Link> 
          </div>
        </section>
      </main>
      <footer className="w-full bg-black text-white py-8">
        <div className="container mx-auto flex flex-col md:flex-row justify-around">
          <div className="mb-4 md:mb-0">
            <h3 className="font-bold mb-2 text-teal-400">Edu.io</h3>
            <ul>
              <li className="text-gray-400">Download</li>
              <li className="text-gray-400">Pricing</li>
              <li className="text-gray-400">Version</li>
              <li className="text-gray-400">Updates</li>
            </ul>
          </div>
          <div className="mb-4 md:mb-0">
            <h3 className="font-bold mb-2 text-teal-400">Product</h3>
            <ul>
              <li className="text-gray-400">Solutions</li>
              <li className="text-gray-400">Trial Product</li>
              <li className="text-gray-400">For Teams</li>
              <li className="text-gray-400">Request Feature</li>
            </ul>
          </div>
          <div className="mb-4 md:mb-0">
            <h3 className="font-bold mb-2 text-teal-400">Company</h3>
            <ul>
              <li className="text-gray-400">Contact Us</li>
              <li className="text-gray-400">Blog</li>
              <li className="text-gray-400">Culture</li>
              <li className="text-gray-400">Jobs</li>
            </ul>
          </div>
          <div className="mb-4 md:mb-0">
            <h3 className="font-bold mb-2 text-teal-400">Support</h3>
            <ul>
              <li className="text-gray-400">Help Center</li>
              <li className="text-gray-400">Service Status</li>
              <li className="text-gray-400">Report a Bug</li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-4">
          <p className="text-gray-400">© 2021 Edu.io</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
