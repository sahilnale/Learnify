// controllers/topicController.js
const Topic = require('../models/Topic');
const Subject = require('../models/Subject');

exports.getTopics = async (req, res) => {
  try {
    const topics = await Topic.find().populate('subject');
    res.json(topics);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createTopic = async (req, res) => {
  const { name, resources, subjectId } = req.body;
  try {
    const newTopic = new Topic({ name, resources, subject: subjectId });
    await newTopic.save();

    // Add topic to subject
    const subject = await Subject.findById(subjectId);
    subject.topics.push(newTopic._id);
    await subject.save();

    res.json(newTopic);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
