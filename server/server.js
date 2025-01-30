import express from "express";
import cors from "cors";
import pg from "pg";
import dotenv from "dotenv";

const app = express();

dotenv.config();
console.log(process.env.DB_CONN);
//use statements
// allows incoming requests from other people
app.use(
  cors({
    origin: "https://sql-6009.onrender.com/messages",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

//read incoming json
app.use(express.json());
//looks for .ENV and pulls the environment variable into the node process
const db = new pg.Pool({ connectionString: process.env.DB_CONN });

db.connect((err, client, release) => {
  if (err) {
    return console.error("Error acquiring client", err.stack);
  }
  console.log("Database connected successfully");
  release(); // Release the client back to the pool
}); //connect to database and log success or error

//defining correct routes
app.get("/", async (req, res) => {
  const result = await db.query("SELECT * FROM GAMES");
  const games = result.rows;
  res.json(games);
});
//error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

app.listen("8080", () => {
  console.log("app running on port 8080! http://localhost:8080");
});

app.post("https://sql-6009.onrender.com/messages", async (req, res) => {
  console.log("req.body", req.body);
  const { message } = req.body;

  try {
    // Insert message into the Supabase database
    const { data, error } = await supabase
      .from("messages")
      .insert([{ message }]);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json({ status: "Message received!", data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
