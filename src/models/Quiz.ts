import mongoose, { Schema, Document, Types } from "mongoose";

export interface IQuestion {
  _id: Types.ObjectId;
  question: string;
  options: string[];
  correct_answer: number;
  points: number;
  difficulty: "easy" | "medium" | "hard";
  category: string;
}

export interface IQuiz extends Document {
  title: string;
  createdBy: string;
  createdAt: Date;
  questions: IQuestion[];
}

const QuestionSchema = new Schema<IQuestion>({
  _id: { type: Schema.Types.ObjectId, auto: true },
  question: { type: String, required: true },
  options: { type: [String], required: true },
  correct_answer: { type: Number, required: true },
  points: { type: Number, required: true },
  difficulty: { type: String, enum: ["easy", "medium", "hard"], required: true },
  category: { type: String, required: true },
});


const QuizSchema = new Schema<IQuiz>({
  title: { type: String, required: true },
  createdBy: { type: String, default:"Admin" },
  createdAt: { type: Date, default: Date.now },
  questions: [QuestionSchema],
});

export default mongoose.model<IQuiz>("Quiz", QuizSchema);