const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("./models/user");

dotenv.config();

const app = express();
app.use(bodyParser.json());

app.post(
  "/auth/signup",
  [
    // postman post
    body("email")
      .isEmail()
      .withMessage("Please type valid email")
      // 유저 이메일 존재여부 확인
      .custom((value) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("E-mail address already exists");
          }
        });
      }),
    body("password")
      .trim()
      .isLength({ min: 6 })
      .withMessage("Password must be greater than 6 characters"),
    body("name").trim().not().isEmpty().withMessage("name field is  required"),
  ],
  // 에러가 생긴 경우를 만듬
  async (req, res, next) => {
    const errors = validationResult(req);
    //  에러인 경우,
    if (!errors.isEmpty()) {
      const error = new Error("validation failed");
      error.statusCode = 422;
      error.data = errors.array();
      return next(error);
    }
    console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    // 해쉬코드 데이터베이스 저장
    try {
      const hashedPassword = await bcrypt.hash(password, 12);

      const user = new User({
        email,
        password: hashedPassword,
        name,
      });
      // 유저 생성
      const result = await user.save();
      res.status(201).json({
        message: "User created",
        user: result,
      });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
    // --------------------------

    // res.json({
    //   message: "Success",
    // });
  }
);
//  에러 내용 구체화 next err
app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({
    message,
    data,
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
