
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config();

module.exports.CreateToken = async (user) => {
    const payload = { email: user.email, id: user._id, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
    return token;
}

module.exports.verifyToken = async (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (error) {
        console.error("Token verification failed:", error.message);
        throw new Error("Invalid token");
    }
}