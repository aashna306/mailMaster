import { User } from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {

      const { email, firstName, lastName, username, password, gender } = req.body;
      if (!email || !firstName || !lastName || !username || !password || !gender) {
        return res.status(400).json({ message: "All fields are required 🤦‍♂️🤦‍♂️🤦‍♂️" });
      }

      const existingEmail = await User.findOne({ email });
      const existingUsername = await User.findOne({ userName: username });
      if (existingEmail) {
        return res.status(400).json({ message: "Email is already registered! 😁😁😁" });
      }
      if (existingUsername) {
        return res.status(400).json({ message: "Username already exists. Try a different one! 😁😁😁" });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);

      const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy?username=${username}`;
      const femaleProfilePhoto = `https://avatar.iran.liara.run/public/girl?username=${username}`;

      await User.create({
        email,
        firstName,
        lastName,
        userName: username,
        password: hashedPassword,
        gender,
        profilePhoto: gender === "male" ? maleProfilePhoto : femaleProfilePhoto,
      });
  
      return res.status(201).json({
        message: "Account created successfully",
        success: true,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error 🥲🥹😭😓" });
    }
  };
  
////////////////////////

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      console.log("Missing fields: ", { username, password });
      return res.status(400).json({ message: "All fields are required 🤦‍♂️🤦‍♂️🤦‍♂️" });
    }

    const user = await User.findOne({ userName: username });
    if (!user) {
      console.log("User not found: ", username);
      return res.status(400).json({ message: "Incorrect username or password", success: false });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      console.log("Password mismatch for user: ", username);
      return res.status(400).json({ message: "Incorrect username or password", success: false });
    }

    const tokenData = { userId: user._id };
    const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });

    return res.status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        _id: user._id,
        username: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
        profilePhoto: user.profilePhoto,
      });
  } catch (error) {
    console.log("Error during login: ", error);
    res.status(500).json({ message: "Server error" });
  }
};

/////////////////////////////////////////////

export const logout = (req, res) => {
  try {
    return res.status(200)
      .cookie("token", "", { maxAge: 0 })
      .json({ message: "Logged out successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
