// models/Subject.js
const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  subject: { type: String, required: true, unique: true }, // Subject name
  topics: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Topic' }], // Array of topic IDs
});

module.exports = mongoose.model('Subject', subjectSchema);
