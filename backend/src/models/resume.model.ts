// import mongoose from "mongoose";

// const resumeSchema = new mongoose.Schema(
//   {
//     userId: String,
//     filename: String,
//     analysis: {
//       name: String,
//       skills: [String],
//       score: Number,
//       summary: String,
//     },
//   },
//   { timestamps: true },
// );

// export default mongoose.model("Resume", resumeSchema);
import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    userId: String,
    filename: String,
    analysis: {
      name: String,
      skills: [String],
      score: Number,
      summary: String,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Resume", resumeSchema);
