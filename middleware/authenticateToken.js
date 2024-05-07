const jwt = require('jsonwebtoken');
const secretKey = "secret12345";
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
