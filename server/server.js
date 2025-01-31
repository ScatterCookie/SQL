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
})

  app.delete('/:id', async (req, res) => {
    console.log(req.params.id)
    const deleted = await db.query(`DELETE FROM games WHERE id = $1`, [req.params.id])
    res.send(req.params.id)
  })

app.put("/:id", async (req, res) => {
  console.log(req.params.id, req.body)
  const update = await db.query(`
    UPDATE games
    SET
    game = $1,
    review = $2,
    WHERE id = $3`,
    [req.body.game, req.body.review, req.params.id]
  )
  res.json({params: req.params.id, body: req.body})
});

app.post("/", async (req, res) => {

  const gameFromClient = req.body.gameName;
  const reviewFromClient = req.body.content;

  console.log(req.body)

  const data = await db.query(
    `INSERT INTO games (game, review) VALUES ('${gameFromClient}', '${reviewFromClient}')`
  );
  res.json(data);
});

app.listen("8080", () => {
  console.log("app running on port 8080! http://localhost:8080");
});