const mongoose = require('mongoose');
const { Schema } = mongoose;

const TagSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, minlength: 1, unique: true, index: true },
    articles: [{ type: Schema.Types.ObjectId, ref: 'Article', index: true }],
  },
  { timestamps: true, collection: 'tags' }
);

module.exports = mongoose.model('Tag', TagSchema);
