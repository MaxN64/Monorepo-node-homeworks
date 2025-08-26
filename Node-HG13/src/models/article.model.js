const mongoose = require('mongoose');
const { Schema } = mongoose;

const ArticleSchema = new Schema(
  {
    title: { type: String, required: true, trim: true, minlength: 2 },
    content: { type: String, default: '' },
    tags: [{ type: Schema.Types.ObjectId, ref: 'Tag', index: true }],
  },
  { timestamps: true, collection: 'articles' }
);

module.exports = mongoose.model('Article', ArticleSchema);
