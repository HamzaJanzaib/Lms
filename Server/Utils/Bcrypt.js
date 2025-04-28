const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();

const saltRounds = parseInt(process.env.BCRYPT_SALT) || 10;

module.exports.hashedPassword = async (password) => {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

module.exports.comparePassword = async (password , userPassword) => {
    const comparePassword =  await bcrypt.compare(password, userPassword);
    return comparePassword;
}