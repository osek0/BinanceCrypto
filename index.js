import express from "express";
import dotenv from "dotenv";
import marketController from "./controllers/marketController.js";
import marketService from "./services/marketService.js";

dotenv.config();

const app = express();
app.use(express.json());
const port = process.env.PORT;

app.listen(port, () => console.log(`App listening on port ${port}`));

app.get("/marketHistory", marketController.getHistoricalMarketData);
