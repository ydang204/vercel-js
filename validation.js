const joi = require('joi');
const jwt = require('jsonwebtoken');

//validating registration
const registerValidation = (data) => {
    const schema = joi.object(
        {
            name: joi.string().min(6).max(255).required(),
            email: joi.string().min(6).max(255).required(),
            password: joi.string().min(6).max(255).required()
        }
    );

    return schema.validate(data);
}

// validate login
const loginValidation = (data) => {
    const schema = joi.object(
        {
            email: joi.string().min(6).max(255).required(),
            password: joi.string().min(6).max(255).required()
        }
    );

    return schema.validate(data);
}

// logic to verify our token (JWT)
const verifyToken = (req, res, next) => {
    const token = req.header("auth-token");

    if (!token) return res.status(401).json({ error: " Access Denied" });

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ error: "Token is not valid" });
    }
}



module.exports = { registerValidation, loginValidation, verifyToken };