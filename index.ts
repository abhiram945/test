import express, { Application, Request, Response} from "express";
import cors from "cors";
import userRoutes from "./src/routes/userRoutes";
import connectDB from "./src/config/db";
import messageRoutes from "./src/routes/messageRoutes";
import quizRoutes from "./src/routes/quizRoutes";
import interviewRoutes from "./src/routes/interviewRoutes";

connectDB();
const app: Application = express();
const PORT = 5002;

const corsOptions = {
  origin: "*",
  credentials: true,
  methods: "GET,POST",
  allowedHeaders: "Content-Type,Authorization",
};

app.use(cors(corsOptions));
app.use(express.json());
app.get("/",(req:Request, res:Response):void=>{res.send("Home route")})
app.use("/chat", messageRoutes);
app.use("/users", userRoutes);
app.use("/quiz", quizRoutes);
app.use("/interview", interviewRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));