import mongoose, { Schema, Document } from "mongoose";

interface ICourseContent extends Document {
  title: string;
  type: "pdf" | "ppt" | "doc" | "video" | "link" | "text";
  url: string;
  description?: string;
}

const CourseContentSchema = new Schema<ICourseContent>({
  title: { type: String, required: true },
  type: {
    type: String,
    enum: ["pdf", "ppt", "doc", "video", "link", "text"],
    required: true,
  },
  url: { type: String, required: true },
  description: { type: String },
});

interface ICourse extends Document {
  title: string;
  description: string;
  image: string;
  category: string;
  rating: number;
  students: number;
  topics: string[];
  contents: ICourseContent[];
  enrolled?: boolean;
}

const CourseSchema = new Schema<ICourse>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  rating: { type: Number, required: true, min: 0, max: 5 },
  students: { type: Number, required: true, default: 0 },
  topics: { type: [String], required: true },
  contents: { type: [CourseContentSchema], required: true },
  enrolled: { type: Boolean, default: false },
});

const Course = mongoose.model<ICourse>("Course", CourseSchema);

export default Course;
