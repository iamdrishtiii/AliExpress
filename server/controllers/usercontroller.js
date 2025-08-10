const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

const signup = async (req, res) => {
       try {

              // Extract name email and password from request body
              const { name, email, password } = req.body;

              if (!name || !email || !password) {
                     return res.status(400).json({ message: 'Please enter credentials' })
              }


              // Check if email is already registered
              const existingUser = await User.findOne({ email });
              if (existingUser) {
                     return res.status(400).json({ error: "Email already exists" });
              }

              // Encrypt password using bcrypt
              const hashedPassword = await bcrypt.hash(password, 10);

              // Create new user 
              const newUser = new User({
                     name,
                     email,
                     password: hashedPassword,
              });

              // Save user to the database
              await newUser.save();


              payload = { userId: newUser._id, name: newUser.name, email: newUser.email }
              const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' })
              // Send token as response
              res.status(201).json({
                     message: "User registered successfully",
                     token,
                     newUser
              });

       } catch (error) {
              console.error("Error in signup route:", error);
              res.status(500).json({ error: "Internal Server Error" });
       }
}



const login = async (req, res) => {
       try {

              // Extract email and password from request body
              const { email, password } = req.body;

              // Check if user exists
              const user = await User.findOne({ email });
              if (!user) {
                     return res.status(401).json({ error: "Invalid credentials" });
              }

              // Compare password using bcrypt
              const passwordMatch = await bcrypt.compare(password, user.password);
              if (!passwordMatch) {
                     return res.status(401).json({ error: "Invalid credentials" });
              }

              payload = { userId: user._id, name: user.name, email: user.email }
              const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' })



              // Send token as response
              res.status(200).json({
                     message: "Login successfully",
                     token,
                     user
              });
       } catch (error) {
              console.error("Error in login route:", error);
              res.status(500).json({ error: "Internal Server Error" });
       }
}

module.exports = { signup, login }