import { Request, Response } from "express";
import Quiz from "../models/Quiz";
import mongoose from "mongoose";

export const addQuiz = async (req: Request, res: Response) => {
  try {
    const quiz = req.body;
    if (!quiz) {
      res.status(400).json({ error: "Quiz details are required" });
    } else {
      quiz.questions = quiz.questions.map((q: any) => ({
        ...q,
        _id: mongoose.Types.ObjectId.isValid(q._id)
          ? new mongoose.Types.ObjectId(q._id)
          : new mongoose.Types.ObjectId(),
      }));

      const newQuiz = new Quiz(quiz);
      await newQuiz.save();
      res.status(200).json({ message: "Quiz created successfully!!!" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to send message " + error });
  }
};

export const getQuizes = async (req: Request, res: Response) => {
  try {
    const quizzes = await Quiz.find({}, "_id title createdBy questions");
    const formattedQuizzes = quizzes.map((quiz) => ({
      _id: quiz._id,
      title: quiz.title,
      createdBy: quiz.createdBy,
      questionsLength: quiz.questions.length,
    }));
    res.status(200).json(formattedQuizzes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};

export const getQuizQuestions = async (req: Request, res: Response) => {
  try {
    const { _id } = req.body;
    const quiz = await Quiz.findById(_id).lean();
    if (!quiz) {
      res.status(404).json({ error: "Quiz not found" });
    } else {
      const quizData = quiz.questions.map(({ correct_answer, ...rest }) => rest);
      res.status(200).json(quizData);
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch quiz " + error });
  }
};

export const getQuizResults = async (req: Request, res: Response) => {
  try {
    const { answers, _id } = req.body;
    if (typeof answers !== "object" || Array.isArray(answers)) {
      res.status(400).json({ error: "Answers must be an object" });
    }
    const quiz = await Quiz.findById(_id);
    if (!quiz) {
      res.status(404).json({ error: "Quiz not found" });
    } else {
      let score = 0;
      Object.entries(answers).forEach(([questionId, selectedOption]) => {
        const question = quiz.questions.find(
          (q: any) => q._id.toString() === questionId
        );
        if (question && question.correct_answer === Number(selectedOption)) {
          score += question.points;
        }
      });
      res.status(200).json({ score, totalQuestions: quiz.questions.length });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to calculate score: " + error });
  }
};
