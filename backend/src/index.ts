import express, { json, type Response } from "express";
import authRoutes from "./routes/auth.routes";
import cookieParser from "cookie-parser";
import cors from "cors";
import { allowedOrigins } from "./config";

const app = express();
app.use(
  cors({
    origin: allowedOrigins,
    methods: "GET, POST, PUT, DELETE",
    allowedHeaders: "Content-Type, Authorization",
    credentials: true,
  }),
);
app.use(json());
app.use(cookieParser());

app.get("/", (_, res: Response) => {
  res.status(200).json("Hello from the Budget Trucker API");
});

app.get("/api", (_, res) => {
  res.send({ message: "Welcome to backend!" });
});

app.use("/api/auth", authRoutes);

const port = process.env["PORT"] || 4000;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

server.on("error", console.error);
