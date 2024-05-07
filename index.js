const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');
const router = require('./routes/apiroutes');
const routerNavigator = require('./routes/navigatorRoute')



const app = express();

mongoose.connect("mongodb+srv://ayeshamutallib:12345@cluster0.mjirszc.mongodb.net/myDatabase").then(() => console.log('Connected to MongoDB'))
.catch(error => console.error('MongoDB connection error:', error));
const port = 1337;

app.use(cors());
app.use(express.json());

// navigaotor
// app.use('/menu', routerNavigator);

// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).send('Something broke!');
// });


app.use('/api',router);


app.listen(port, () => {
    console.log("Server is running on port " + port);
});
