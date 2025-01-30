import express from "express";
import cors from "cors";
import pg from "pg";
import dotenv from "dotenv";

const app = express();

dotenv.config();
console.log(process.env.DB_CONN);
//use statements
// allows incoming requests from other people
app.use(cors());

//read incoming json
app.use(express.json());
//looks for .ENV and pulls the environment variable into the node process
const db = new pg.Pool({ connectionString: process.env.DB_CONN });

//defining correct routes
app.get("/", async (req, res) => {
  const result = await db.query("SELECT * FROM GAMES");
  const games = result.rows;
  res.json(games);
});
//error handling
app.use((err, req, res, next) => {
  console.err(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
  next();
});

app.listen("8080", () => {
  console.log("app running on port 8080! http://localhost:8080");
});

app.post("/", async (req, res) => {
  const gameFromClient = req.body.game;
  const reviewFromClient = req.body.review;
  const data = await db.query(
    `INSERT INTO games (game, review) VALUES ('${gameFromClient}', '${reviewFromClient}')`
  );
  res.json(data);
});
