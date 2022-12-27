let mongoose = require("mongoose");
let Schema = mongoose.Schema;

const postSchema = new Schema(
    {
      group: {
        type: String,
        required: true,
      },
      text: {
        type: String,
        required: true,
        unique: true,
      },
      tags: {
        type: Array,
        default: [],
      },
      stars: {
        type: Number,
        default: 0,
      },
      critic: {
        type: Array,
        default: [],
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
      },
      imageUrl: String,
    },
    {
      timestamps: true,
    },
  );

let postModel = mongoose.model("post", postSchema, "post");

module.exports = postModel;