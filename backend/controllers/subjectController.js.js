// controllers/subjectController.js
const Subject = require('../models/Subject');

exports.getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find().populate('topics');
    res.json(subjects);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createSubject = async (req, res) => {
  const { name } = req.body;
  try {
    const newSubject = new Subject({ name });
    await newSubject.save();
    res.json(newSubject);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
