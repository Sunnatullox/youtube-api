import express from "express";
import { connect, set } from "mongoose";
import { config } from "dotenv";
import AuthRouter from "./Router/Auth.routes";
import VideoRouter from "./Router/video.routes";
import cors from "cors";
import fs from "fs";
import path from "path";
import { json } from "body-parser";
config();

const app = express();
// ================================================= Midleware =================================================
app.use(cors());
app.use(json());

// ============================== MONGODB CONNECT ==========================

const mongoo_url = process.env.MONGODB_URL;
set("strictQuery", false);
connect(mongoo_url, {
  useNewUrlParser: true,
})
  .then(() => {
    console.log("Mongodb connect succesfully");
  })
  .catch((err) => {
    console.log(err);
  });

// =============================Server Endpoind =================
app.use("/api", AuthRouter);
app.use("/api", VideoRouter);


app.get("/", (req, res) => {
  fs.readFile(path.join(__dirname, '../index.html'), (err, data) => {
    if (err) {
		console.log(err)
      res.status(500).send("Xatolik yuz berdi!");
    } else {
      res.send(data.toString());
    }
  });
});

const PORT = process.env.PORT ?? 5000;

app.listen(PORT, () => {
  console.log("Server listening on port " + PORT);
});
