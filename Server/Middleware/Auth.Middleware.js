module.exports.ValidInput = async (req, res, next) => {
    const { name, email, password } = req.body; 
    if (!name || !email || !password) {
        return res.status(400).json({ success: false, error: "All fields are required" });
    }
    next();
};
module.exports.ValidInputlogin = async (req, res, next) => {
    const { email, password } = req.body; 
    if (!email || !password) {
        return res.status(400).json({ success: false, error: "All fields are required" });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ success: false, error: "Invalid email format" });
    }
    if (password.length < 6) {
        return res.status(400).json({ success: false, error: "Password must be at least 6 characters" });
    }
    next();
};
