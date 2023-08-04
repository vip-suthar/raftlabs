import mongoose from "mongoose";
const Schema = mongoose.Schema;

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Blog title required"],
      unique: true,
    },
    description: {
      type: String,
      required: [true, "Blog description required"],
    },
    tags: {
      type: [String],
      required: false,
      default: []
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
