const express = require('express');
const { createSubject, getSubjects, getSubjectsByUser } = require('../controllers/subjectController');

const router = express.Router();

// Create a new subject
router.post('/', createSubject);

// Get all subjects
router.get('/', getSubjects);

// Get subjects for a specific user
router.get('/user/:userId', getSubjectsByUser);

module.exports = router;
