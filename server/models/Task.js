import mongoose from "mongoose";

const tackSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Task", tackSchema);
