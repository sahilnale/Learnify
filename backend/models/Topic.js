// models/Topic.js
const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  resources: [String],
  subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' },
});

module.exports = mongoose.model('Topic', topicSchema);
