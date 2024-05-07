const jwt = require('jsonwebtoken');
const secretKey = "secret12345";
// jwt.verify needs token,secretkey,error and decoder authenticate token is for decoding 
exports.authenticateToken = (req, res, next) => {
    const token = req.body.token;
    if (!token) {
        return res.status(401).json({ status: "error", error: "Unauthorized" });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(403).json({ status: "error", error: "Forbidden" });
        }
        req.user = decoded;
        next();
    });
};
