import express from "express";
import { register, login, getUserDetails, updateUserDetails, generateInviteLink, getAllUsers } from "../controllers/authController";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.post('/getUserDetails', getUserDetails);

router.post('/updateUserDetails', updateUserDetails);

router.get('/generateInviteLink', generateInviteLink);

router.get("/getAllUsers",getAllUsers);

export default router;