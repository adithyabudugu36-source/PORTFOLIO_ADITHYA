const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const Contact = require("./models/Contact");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Backend running 🚀");
});

app.post("/contact", async (req, res) => {
    try {
        const { name, email, message } = req.body;

        const newMessage = new Contact({ name, email, message });
        await newMessage.save();

        res.json({ message: "Saved to DB 🚀" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error" });
    }
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});