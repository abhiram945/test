import express from "express"
import { addInterview, bookInterview, getInterviews} from "../controllers/interviewController";

const router = express.Router();

router.post("/addInterview", addInterview);
router.post("/bookInterview", bookInterview);
router.get("/getInterview", getInterviews);

export default router;