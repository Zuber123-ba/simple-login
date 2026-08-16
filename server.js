const express = require("express");
const connectDB = require("./db");
const User = require("./models/User");
const bcrypt = require("bcrypt");

const app = express();

const PORT = 3000;

// Connect MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Frontend
app.use(express.static("public"));


// ============================
// REGISTER API
// ============================

app.post("/register", async (req, res) => {

    try {

        const { name, email, password } = req.body;

        // Check existing user
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "Email already registered"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = new User({
            name: name,
            email: email,
            password: hashedPassword
        });

        await user.save();

        res.json({
            message: "Registration successful!"
        });

    } catch (error) {

        console.log("Registration error:", error);

        res.status(500).json({
            message: "Server error"
        });

    }

});


// ============================
// LOGIN API
// ============================

app.post("/login", async (req, res) => {

    try {

        const { email, password } = req.body;

        // Find user
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // Check password
        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        res.json({
            message: "Login successful!",
            user: {
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {

        console.log("Login error:", error);

        res.status(500).json({
            message: "Server error"
        });

    }

});


// ============================
// START SERVER
// ============================

app.listen(PORT, () => {

    console.log(`Server running at http://localhost:${PORT}`);

});