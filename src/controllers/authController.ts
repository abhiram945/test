import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password, graduationYear, aluminiRole, mobile } = req.body;
    let { role } = req.body;
    const token = req.query.token as string;
    if (token) {
      try {
        jwt.verify(token, "cw@ewojRY&VTyUUY8O");
        role = "alumni";
      } catch (error) {
        res.status(400).json({message:"Invite link expired or invalid" });
        return;
      }
    }
    if(!role){
      role = "member";
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ error: "User already exists" });
      return
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      graduationYear,
      role,
      aluminiRole:role==="alumni"?aluminiRole:"",
      mobile
    });
    await newUser.save();
    const {_id } = newUser;
    res.status(201).json({_id, username, email });
  } catch (error) {
    res.status(500).json({ error: "Failed to create user " + error });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "User not found" });
    } else {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.status(400).json({ message: "Invalid credentials" });
      } else {
        const {_id, username, email } = user;
        res.status(200).json({_id, username, email });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getUserDetails = async (req: Request, res: Response) => {
  try {
    const { _userId } = req.body;
    const user = await User.findById(_userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const updateUserDetails = async (req: Request, res: Response) => {
  try {
    const details = req.body;
    if (!details || !details.email) {
      res.status(400).json({ message: "Invalid request: Email is required" });
    }
    const user = await User.findOneAndUpdate(
      { email: details.email },
      details,
      { new: true, runValidators: true }
    );
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "Updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const generateInviteLink = async (req: Request, res: Response) => {
  try {
    const token = jwt.sign({ role: "invite" }, process.env.SECRET_KEY || "", { expiresIn: "2m" });
    const inviteLink = `${req.get("Origin")}/login?token=${token}`;
    res.status(200).json(inviteLink);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    if (users.length === 0) {
      res.status(404).json({ message: "Users not found" });
    } else {
      res.status(200).json(users);
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};