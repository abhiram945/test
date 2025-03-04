import { Request, Response } from "express";
import Chat from "../models/Chat";

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { message } = req.body;
    const senderName = message.senderName;
    if (!senderName || !message) {
      res.status(400).json({ error: "Sender ID and message are required" });
    } else {
      const text = message.message;
      const senderMail = message.senderMail;
      const chat = new Chat({ senderName, message: text, senderMail, repliedTo:message.repliedTo });
      await chat.save();
      res.status(201).json([chat]);
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to send message " + error });
  }
};

export const getMessages = async (req: Request, res: Response) => {
  try {
    const chats = await Chat.find();
    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};
