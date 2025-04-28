const express = require('express');

const { Register, Login } = require('../Controllers/Auth.Controllers');
const { ValidInput, ValidInputlogin } = require('../Middleware/Auth.Middleware');

const router = express.Router();
console.log("Auth Routes" );

router.get('/' , (req, res) => {
    console.log("Auth Routes" );
    res.send("Auth Routes");
});

router.post('/Register' , ValidInput, Register);
router.post('/Login', ValidInputlogin, Login);

module.exports = router;