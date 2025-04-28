const UserModel = require("../config/Models/User");
const { hashedPassword, comparePassword } = require("../Utils/Bcrypt");
const { CreateToken } = require("../Utils/Jwt");

module.exports.Register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(400).json({ success: false, error: "User already exists" });
        }

        const hash = await hashedPassword(password);
        await UserModel.create({ name, email, password: hash });
        res.status(201).json({ success: true, message: "User registered successfully", user: { name, email } });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

module.exports.Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, error: "Invalid credentials" });
        }
        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, error: "Invalid credentials" });
        }
        const token = await CreateToken(user);
        res.status(200)
           .cookie("token", token, { 
               httpOnly: true, 
               sameSite: "Strict", 
               maxAge: 3600000 
           })
           .json({ 
               success: true, 
               message: "User logged in successfully", 
               user 
           });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}
