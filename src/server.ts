import express from "express";
import { router } from "./routes";

const app = express();
const json = express.json();

app.use(json);
app.use(router);

app.listen(3333, () => {
  console.log("Server running!");
});
