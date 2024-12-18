const Topic = require('../models/Topic'); // Import Topic model
const Subject = require('../models/subject'); // Import Subject model

// Create a new topic and link it to a subject
const createTopic = async (req, res) => {
  console.log("creating")
  const { name, resources, subjectId } = req.body;

  // Validate request data
  if (!name || !Array.isArray(resources) || !subjectId) {
    return res.status(400).json({ message: 'Invalid data. Name, resources, and subjectId are required.' });
  }

  try {
    // Step 1: Create the topic
    const newTopic = new Topic({ name, resources, subject: subjectId });
    await newTopic.save();

    // Step 2: Link the topic to the subject
    const subject = await Subject.findById(subjectId);
    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }
    subject.topics.push(newTopic._id); // Add topic ID to the subject's topics array
    await subject.save();

    // Step 3: Respond with the created topic
    res.status(201).json(newTopic);
  } catch (error) {
    console.error('Error creating topic:', error);
    res.status(500).json({ message: 'Failed to create topic', error });
  }
};

// Get all topics
const getTopics = async (req, res) => {
  try {
    const topics = await Topic.find(); // Fetch all topics
    res.status(200).json(topics);
  } catch (error) {
    console.error('Error fetching topics:', error);
    res.status(500).json({ message: 'Failed to fetch topics' });
  }
};

// Get topics for a specific subject
const getTopicsBySubject = async (req, res) => {
  const { subjectId } = req.params;

  try {
    const subject = await Subject.findById(subjectId).populate('topics'); // Populate topics
    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }
    res.status(200).json(subject.topics);
  } catch (error) {
    console.error('Error fetching topics for subject:', error);
    res.status(500).json({ message: 'Failed to fetch topics for the subject' });
  }
};

module.exports = {
  createTopic,
  getTopics,
  getTopicsBySubject,
};
