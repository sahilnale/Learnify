const express = require('express');
const { createTopic, getTopics, getTopicsBySubject } = require('../controllers/topicController');

const router = express.Router();

// Create a new topic
router.post('/', createTopic);

// Get all topics
router.get('/', getTopics);

// Get topics for a specific subject
router.get('/subject/:subjectId', getTopicsBySubject);

module.exports = router;
