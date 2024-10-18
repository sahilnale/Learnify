// models/Subject.js
const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  topics: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Topic' }],
});

module.exports = mongoose.model('Subject', subjectSchema);
