const express = require('express');
const router = express.Router();
const { register } = require('../controllers/register.controller');
const { login } = require('../controllers/login.controller');
// const passport = require('passport'); 


const { getUserInfo } = require('../controllers/getuserInfo.controller');
const { authenticateToken } = require('../middleware/authenticateToken');

router.post('/register', register);
router.post('/login', login);
router.post('/userinfo',authenticateToken,getUserInfo);

// router.get("/login/success", (req, res) => {
// 	if (req.user) {
// 		res.status(200).json({
// 			error: false,
// 			message: "Successfully Loged In",
// 			user: req.user,
// 		});
// 	} else {
// 		res.status(403).json({ error: true, message: "Not Authorized" });
// 	}
// });

// router.get("/login/failed", (req, res) => {
// 	res.status(401).json({
// 		error: true,
// 		message: "Log in failure",
// 	});
// });


// router.get("/google", passport.authenticate("google", ["profile", "email"]));


// router.get(
// 	"/google/callback",
// 	passport.authenticate("google", {
// 		successRedirect: process.env.CLIENT_URL,
// 		failureRedirect: "/login/failed",
// 	})
// );

// router.get("/logout", (req, res) => {
// 	req.logout();
// 	res.redirect("http://localhost:3000/");
// });
module.exports = router;
