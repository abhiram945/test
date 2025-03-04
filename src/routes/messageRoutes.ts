import express from "express";
import { sendMessage, getMessages } from "../controllers/messageController";

const router = express.Router();

router.post("/sendMessage", sendMessage);

router.get("/getAll", getMessages);

export default router;