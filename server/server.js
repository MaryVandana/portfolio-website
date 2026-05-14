const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Contact = require("./models/Contact");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

app.post("/contact", async (req, res) => {
    try {
        const contact = new Contact(req.body);
        await contact.save();

        res.json({
            message: "Message Saved Successfully"
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Error"
        });
    }
});

app.listen(5000, () => {
    console.log("Server Running on Port 5000");
});