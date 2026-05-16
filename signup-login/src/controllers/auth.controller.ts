import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { userModel } from "../model/User.js";

export const signup = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(403).json({
        message: "All fields are required to fill!",
      });
    }

    console.log(name, email, password);

    const user = await userModel.findOne({ email });
    if (user) {
      return res
        .status(403)
        .json({ message: "Email already exist or Use differnt email" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    await userModel.create({
      name: name,
      email: email,
      password: password,
    });

    res.status(201).json({
      message: "User registered sucessfully!",
    });
  } catch (error) {
    res.json({ message: "Internal server error" });
    console.log("Error while signup: ", error);
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(403).json({
        message: "All fields are required to fill!",
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const SECRET_USER_JWT = process.env.JWT_SECRET;
    if (!SECRET_USER_JWT) {
      return res.json({ message: "SECRET_NOT_SET" });
    }
    const token = jwt.sign(
      { id: user._id, email: user.email },
      SECRET_USER_JWT,
      {
        expiresIn: "7d",
      },
    );

    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    res.status(201).json({ token });
  } catch (error) {
    res.json({ message: "Internal server error" });
    console.log("Error while login: ", error);
  }
};
