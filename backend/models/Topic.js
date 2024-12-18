// models/Topic.js

const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Name of the topic
  resources: [{ type: String }], // Array of resources
  subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }, // Reference to the Subject
});

module.exports = mongoose.model('Topic', topicSchema);
