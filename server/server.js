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

app.get("/", async (req, res) => {
  const result = await db.query("SELECT * FROM GAMES");
  const games = result.rows;
  res.json(games);
});

app.post("/games", async (req, res) => {
  const gameFromReq = req.body.game;
  const platformFronReq = req.body.platform;
  const data = await db.query(
    `INSERT INTO games (platform, game) VALUES ('${gameFromReq}', '${platformFronReq}')`
  );
  res.json(data);
});

app.listen("8080", () => {
  console.log("app running on port 8080! http://localhost:8080");
});
