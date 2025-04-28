const express = require('express');
const dotenv = require("dotenv");
const connectDB = require('./config/Connect-DB.js');
const cors = require("cors");
const path = require('path');
const cookieParser = require('cookie-parser');
const AuthRoutes = require('./Routes/Auth.Routes');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
app.use(express.json({ limit: "50mb" }));  // Increased limit
app.use(express.urlencoded({ extended: true, limit: "50mb" }));  // Increased limit
app.use(cors({
    origin: ["http://localhost:5173"], 
    credentials: true,
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'Client', 'dist')));  // Modified path

app.use('/api/auth', AuthRoutes);

const startServer = async () => {
    try {
        await connectDB(process.env.MONGO_URI);  // Added await
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.error("Error starting server:", error.message);
        process.exit(1);  // Exit process on error
    }
};

startServer();
