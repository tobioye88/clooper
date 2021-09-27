import express from "express";
import dotenv from "dotenv";
import { routes } from "./routes";
import { connect } from "mongoose";
import bodyParser from "body-parser";
import { subscribers } from "./utils/subscribers";
import { allMiddleware } from './middlewares/all';

dotenv.config();

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 8000;
const DB_URL = process.env.DB_URL || "";

// middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
allMiddleware(app);

routes(app);
subscribers();

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
  if(DB_URL) {
    connect(DB_URL, (error) => {
      if (error) console.log(error);
      else console.log(`⚡️[database]: DB connected`);
    });
  }
});
