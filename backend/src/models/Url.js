const mongoose = require("mongoose");
const { schema } = mongoose;

const UrlSchema = new Schema({
  slug: { type: String, required: true, unique: true, index: true }, // short id
  target: { type: String, required: true }, // original long URL
  owner: { type: Schema.Types.ObjectId, ref: "User", default: null }, // optional
  clicks: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, default: null },
  passwordHash: { type: String, default: null }, // for protected links (future)
  meta: {
    title: String,
    description: String,
  },
});

module.exports = mongoose.model("Url", UrlSchema);
