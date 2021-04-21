const jwt = require("jsonwebtoken");

const sendToken = (user, statusCode, res) => {

    const token = jwt.sign({id: user._id,email: user.email},process.env.JWT_SECRET,{expiresIn: process.env.JWT_EXPIRES_TIME});

    res.status(statusCode).json({
        success: true,
        token,
        user
    })

}

module.exports = sendToken;