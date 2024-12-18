const Subject = require('../models/subject'); // Import Subject model
const User = require('../models/User'); // Import User model

// Create a new subject and link it to the current user
const createSubject = async (req, res) => {
  const { subject, topicIds, userId } = req.body;

  // Validate request data
  if (!subject || !Array.isArray(topicIds) || !userId) {
    return res.status(400).json({ message: 'Invalid data. Subject, topicIds, and userId are required.' });
  }

  try {
    // Step 1: Create the subject
    const newSubject = new Subject({ subject, topics: topicIds });
    await newSubject.save();

    // Step 2: Link the subject to the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.subjects.push(newSubject._id); // Add subject ID to the user's subjects array
    await user.save();

    // Step 3: Respond with the created subject
    res.status(201).json(newSubject);
  } catch (error) {
    console.error('Error creating subject:', error);
    res.status(500).json({ message: 'Failed to create subject', error });
  }
};

// Get all subjects
const getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find().populate('topics'); // Fetch all subjects and populate topics
    res.status(200).json(subjects);
  } catch (error) {
    console.error('Error fetching subjects:', error);
    res.status(500).json({ message: 'Failed to fetch subjects' });
  }
};

// Get subjects for a specific user
const getSubjectsByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).populate({
      path: 'subjects',
      populate: { path: 'topics' }, // Populate topics for each subject
    });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user.subjects);
  } catch (error) {
    console.error('Error fetching subjects for user:', error);
    res.status(500).json({ message: 'Failed to fetch subjects for user' });
  }
};

module.exports = {
  createSubject,
  getSubjects,
  getSubjectsByUser,
};
