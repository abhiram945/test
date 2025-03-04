import express from "express";
import { addQuiz, getQuizes, getQuizQuestions, getQuizResults } from "../controllers/quizController";

const router = express.Router();

router.post("/addQuiz", addQuiz);

router.get("/getQuizes",getQuizes);

router.post("/getQuizQuestions", getQuizQuestions);

router.post("/getQuizResults", getQuizResults);

export default router;
