const jwt = require("jsonwebtoken");

const sendToken = (user, statusCode, res) => {

    const token = jwt.sign({id: user._id,email: user.email},process.env.JWT_SECRET,{expiresIn: 3600});

    res.status(statusCode).json({
        success: true,
        token,
        user
    })

}

module.exports = sendToken;