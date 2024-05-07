
// const express = require('express');
// const app = express();
// const mongoose = require("mongoose");
// const bcrypt = require('bcrypt');
// const Usermodel = require('./models/user.model');
// const jwt = require('jsonwebtoken');
// const secretKey="secret12345"

// mongoose.connect("mongodb+srv://ayeshamutallib:12345@cluster0.mjirszc.mongodb.net/myDatabase");
// const port = 1337;

// const cors = require('cors');
// app.use(cors());
// app.use(express.json());

// app.post('/api/register', async (req, res) => {
//     console.log(req.body);
//     // try {
//     //     const existingUser = await Usermodel.findOne({ email: req.body.email });
//     //     if (existingUser) {
//     //         return res.status(400).json({ status: "error", error: "Email already exists" });
//     //     }

//     //     const hashedPassword = await bcrypt.hash(req.body.password, 10);

//     //     await Usermodel.create({
//     //         name: req.body.name,
//     //         email: req.body.email,
//     //         password: hashedPassword
//     //     });

//     //     res.json({ status: "ok" });
//     // } catch (error) {
//     //     res.status(500).json({ status: "error", error: "Internal server error" });
//     // }
// });

// app.post('/api/login', async (req, res) => {
//     console.log(req.body);
//     // try {
//     //     const user = await Usermodel.findOne({ email: req.body.email });
//     //     if (!user) {
//     //         return res.status(400).json({ status: "error", error: "Invalid email or password" });
//     //     }

//     //     const passwordMatch = await bcrypt.compare(req.body.password, user.password);
//     //     if (!passwordMatch) {
//     //         return res.status(400).json({ status: "error", error: "Invalid email or password" });
//     //     }

//     //     const token = jwt.sign({
//     //         userId: user._id,
//     //         name: user.name,
//     //         email: user.email
//     //     }, secretKey);

//     //     res.json({ status: "ok", token });
//     // } catch (error) {
//     //     res.status(500).json({ status: "error", error: "Internal server error" });
//     // }
// });

// // Example protected route
// app.get('/api/user', authenticateToken, (req, res) => {
//     res.json({ status: "ok", user: req.user });
// });

// // Middleware to authenticate JWT token
// function authenticateToken(req, res, next) {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];
//     if (!token) {
//         return res.status(401).json({ status: "error", error: "Unauthorized" });
//     }

//     jwt.verify(token, secretKey, (err, decoded) => {
//         if (err) {
//             return res.status(403).json({ status: "error", error: "Forbidden" });
//         }
//         req.user = decoded;
//         next();
//     });
// }


// app.post('/api/login/islogin', async (req, res) => {
//     console.log(req.body);
//     try {
//         const user = await Usermodel.findOne({ email: req.body.email });
//         if (!user) {
//             return res.status(400).json({ status: "error", error: "Invalid email or password" });
//         }

//         const passwordMatch = await bcrypt.compare(req.body.password, user.password);
//         if (!passwordMatch) {
//             return res.status(400).json({ status: "error", error: "Invalid email or password" });
//         }

//         const token = jwt.sign({
//             userId: user._id,
//             name: user.name,
//             email: user.email
//         }, secretKey);

//         res.json({ status: "ok", token });
//     } catch (error) {
//         res.status(500).json({ status: "error", error: "Internal server error" });
//     }
// });
// // API endpoint to return user info
// app.post('/api/userinfo', (req, res) => {
//     try {
//         // Extract token from the request body
//         const token = req.body.token;
//         if (!token) {
//             return res.status(400).json({ status: "error", error: "Token is missing" });
//         }

//         // Verify the token
//         jwt.verify(token, secretKey, (err, decoded) => {
//             if (err) {
//                 return res.status(403).json({ status: "error", error: "Invalid token" });
//             }

//             // Extract user information from the decoded token
//             const { email, name } = decoded;

//             // Return user information as a response
//             res.json({ status: "ok", email, name });
//         });
//     } catch (error) {
//         // Handle errors
//         res.status(500).json({ status: "error", error: "Internal server error" });
//     }
// });


// app.listen(port, () => {
//     console.log("i am listening" + port);
// });
const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');
const router = require('./routes/apiroutes');
// const cookieSession=require("cookie-session")
// const passport=require('passport')
// require("dotenv").config()


const app = express();
// app.use(passport.initialize());
// app.use(passport.session());
mongoose.connect("mongodb+srv://ayeshamutallib:12345@cluster0.mjirszc.mongodb.net/myDatabase").then(() => console.log('Connected to MongoDB'))
.catch(error => console.error('MongoDB connection error:', error));
const port = 1337;

app.use(cors());
app.use(express.json());

// app.use(
//     cookieSession({
// name:"session",
// keys:["cyberwolve"],
// maxAge:24*60*60*100
//     })
// )

// // Initialize Passport and session middleware

// app.use(
//     cors({
//         origin:"http://localhost:3000/",
//         methods:"GET,POST,PUT,DELETE",
//         credentials:true
//     })
// )

app.use('/api',router);

app.listen(port, () => {
    console.log("Server is running on port " + port);
});
