import mongoose, { Schema, Document } from "mongoose";

export interface IChat extends Document {
  senderName: string;
  message: string;
  senderMail: string;
  createdAt: Date;
  repliedTo?:string;
}

const ChatSchema = new Schema<IChat>(
  {
    senderName: { type: String, required: true },
    message: { type: String, required: true },
    senderMail: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    repliedTo: {type:String},
  },
  { timestamps: true }
);

export default mongoose.model<IChat>("Chat", ChatSchema);