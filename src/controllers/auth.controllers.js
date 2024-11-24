const authModel = require("../models/auth.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config");

exports.register = async (req, res) => {
  const {
    userName,
    firstName,
    lastName,
    email,
    password,
    phoneNumber,
    gender,
    birthDate,
  } = req.body;
  try {
    const existingUser = await authModel.findOne({ userName, email });

    if (existingUser) {
      res.status(400).json({
        error:
          existingUser.userName === userName
            ? "Username already exists."
            : "Email already exists.",
      });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new authModel({
        userName,
        firstName,
        lastName,
        email,
        password: hashedPassword,
        phoneNumber,
        gender,
        birthDate,
      });
      await newUser.save();
      res.status(201).json({ message: "User created successfully.", newUser });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Registration error", error: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await authModel.findOne({ email });
    if (!user) res.status(404).json({ error:"Invalid email or password" });
    
    const compare = await bcrypt.compare(password, user.password);
    if (!compare) res.status(401).json({ error: "Invalid email or password" });

    const token = jwt.sign({ id: user._id }, config.jwtSecret, { expiresIn: "1h" });
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Login error", error: error.message });
  } 
};
