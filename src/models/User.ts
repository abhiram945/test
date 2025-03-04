import mongoose, { Schema, Document } from "mongoose";

export enum UserType {
  ADMIN = "admin",
  MEMBER = "member",
  ALUMNI = "alumni",
}

export interface IUser extends Document {
  email: string;
  password: string;
  userType: UserType;
  username: string;
  graduationYear: number;
  role: UserType;
  joinDate: Date;
  profilePicUrl: string;
  alumniRole: string;
  mobile:string;
  linkedin: string;
  github: string;
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  graduationYear: { type: Number, min: 2000, max: new Date().getFullYear() + 3 },
  role: { type: String, enum: Object.values(UserType), required: true },
  joinDate: { type: Date, default: Date.now },
  alumniRole: { type: String },
  profilePicUrl: { type: String },
  mobile:{type:String, required:true},
  linkedin: { type: String },
  github: { type: String },
});

export default mongoose.model<IUser>("User", UserSchema);
