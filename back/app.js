import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
dotenv.config();

const app = express();
app.use(bodyParser.json());

app.post("/auth/signup", (req, res, next) => {
  console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;
  res.json({
    message: "Success",
  });
});

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.peubz.mongodb.net/taskmanagerTest?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(3000, () => console.log("3000port start!"));
  })
  .catch((err) => console.log(err));
