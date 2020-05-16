const JWT = require('jsonwebtoken');



module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decoded = JWT.verify(token, "1234567890");
        req.userData = decoded;
        next()
    } catch (err) {
        return res.status(401).json({
            message: "Auth fail"
        })
    }
}