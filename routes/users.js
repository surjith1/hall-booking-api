import express from "express";
import { client } from "../index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();
async function genHashedPassword(password) {
  const NO_OF_ROUNDS = 10;
  const salt = await bcrypt.genSalt(NO_OF_ROUNDS);
  console.log("Salt Value : ", salt);
  const hashPassword = await bcrypt.hash(password, salt);
  console.log("Hashed Password", hashPassword);
  return hashPassword;
}
router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await genHashedPassword(password);
  console.log(hashedPassword);
  const isUserExist = await getUserByName(username);
  console.log("Username : ", isUserExist);
  if (isUserExist) {
    res.status(401).send({ msg: "Choose Another username :" });
  } else {
    const result = await createSignupUser({
      username: username,
      password: hashedPassword,
    });
    res.send(result);
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const userFromDB = await getUserByName(username);
  console.log(userFromDB);
  //check for user name

  if (!userFromDB) {
    res.status(401).send({ msg: "Invalid Credentials" });
  } else {
    const storedPassword = userFromDB.password;
    const isPasswordMatch = await bcrypt.compare(password, storedPassword);
    console.log(isPasswordMatch);
    if (isPasswordMatch) {
      const token = jwt.sign({ id: userFromDB._id }, process.env.SECRET_KEY);
      res.send({ msg: "Successfully Loged in", token: token });
    } else {
      res.status(401).send({ msg: "Invalid Credentials" });
    }
  }
});

export const usersRouter = router;
//store signup username into db
async function createSignupUser(data) {
  return await client.db("Movies").collection("users").insertOne(data);
}
async function getUserByName(username) {
  return await client
    .db("Movies")
    .collection("users")
    .findOne({ username: username });
}

import express from "express";
import bcrypt from "bcrypt";
import { User } from "../models/user.js";
import { Token } from "./../models/token.js";
import crypto from "crypto";
import { sendEmail } from "./../utils/sendEmail.js";

const router = express.Router();
router.post("/", async (req, res) => {
  try {
    // const { error } = validate(req.body);
    // if (error)
    //   return res.status(400).send({ message: error.details[0].message });

    let user = await User.findOne({ email: req.body.email });
    if (user)
      return res
        .status(409)
        .send({ message: "User with given email already Exist!" });

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    user = await new User({ ...req.body, password: hashPassword }).save();

    const token = await new Token({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();
    const url = `${process.env.BASE_URL}users/${user.id}/verify/${token.token}`;
    await sendEmail(user.email, "Verify Email", url);

    res
      .status(201)
      .send({ message: "An Email sent to your account please verify" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.get("/:id/verify/:token/", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) return res.status(400).send({ message: "Invalid link" });

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) return res.status(400).send({ message: "Invalid link" });

    await User.updateOne({ _id: user._id, verified: true });
    await token.remove();

    res.status(200).send({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});
export const userRoutes = router;
