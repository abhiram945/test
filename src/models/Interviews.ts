import mongoose, { Schema, Document } from "mongoose";

interface IInterview extends Document {
  username: string;
  role: string;
  alumniRole?: string;
  userId: mongoose.Types.ObjectId;
  interviewDate: Date;
  numberOfSlots: number;
  slots: {
    startTime: string;
    bookedBy?: mongoose.Types.ObjectId;
  }[];
  interviewLink:string;
}

const InterviewSchema = new Schema<IInterview>({
  username: { type: String, required: true },
  role: { type: String, required: true },
  alumniRole: { type: String },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  interviewDate: { type: Date, required: true },
  numberOfSlots: { type: Number, required: true },
  slots: [
    {
      startTime: { type: String, required: true },
      bookedBy: { type: Schema.Types.ObjectId, ref: "User", default: null }, // Null if available
    },
  ],
  interviewLink:{type:String,required:true}
});

export default mongoose.model<IInterview>("Interview", InterviewSchema);
