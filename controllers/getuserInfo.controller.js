const jwt = require('jsonwebtoken');
const secretKey = "secret12345";

exports.getUserInfo = (req, res) => {
    try {
        const token = req.body.token;
        if (!token) {
            return res.status(400).json({ status: "error", error: "Token is missing" });
        }

        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                return res.status(403).json({ status: "error", error: "Invalid token" });
            }

            const { email, first_name } = decoded;
            res.json({ status: "ok", email, first_name });
        });
    } catch (error) {
        res.status(500).json({ status: "error", error: "Internal server error" });
    }
};
