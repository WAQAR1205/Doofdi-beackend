const express = require('express');
const { getMenuController } = require('../controllers/navigatorController.js');
const router = express.Router();

// Route to fetch menu based on user's role
router.get('/navigator', getMenuController );

module.exports = router;
