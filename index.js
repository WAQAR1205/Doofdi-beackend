const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const router = require("./routes/apiroutes");
const databaseConnection = require("./database/db.js");
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary");
const bodyParser = require('body-parser');
// const { default: adminRouter } = require("./routes/admin.js");
const app = express();
app.use(bodyParser.json());


app.use(cors());
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);
app.use("/api/v1/auth", require("./routes/authRoute"));
app.use("/api/v1/user", require("./routes/userRoute"));
app.use("/admin", require("./routes/admin.js"))

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

cloudinary.v2.config({
  cloud_name: "Doofdi Backend",
  api_key: 625133414825635,
  api_secret: "ndtSNrfoBVt-4ZpeG2ICcck8lw0",
});

databaseConnection();

const PORT = 8000;

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});


// data

function homeHandler(req, res) {
  // Fetch home page data
  const homeData = {
      message: 'Welcome to the home page!',
      // Additional data related to the home page
      featuredItems: [
          { id: 1, name: 'Featured Item 1', description: 'Description of Featured Item 1' },
          { id: 2, name: 'Featured Item 2', description: 'Description of Featured Item 2' }
      ],
      announcements: [
          { id: 1, title: 'Announcement 1', content: 'Content of Announcement 1' },
          { id: 2, title: 'Announcement 2', content: 'Content of Announcement 2' }
      ],
      events: [
          { id: 1, title: 'Event 1', description: 'Description of Event 1', date: '2024-05-15' },
          { id: 2, title: 'Event 2', description: 'Description of Event 2', date: '2024-06-01' }
      ],
      // Other home page data...
  };
  res.json(homeData);
}
function settingsHandler(req, res) {
  // Fetch user settings
  const settingsData = {
      // Retrieve settings data from the database or other source
      // For example:
      theme: 'light',
      language: 'en',
      notifications: true,
      timezone: 'UTC+0',
      emailNotifications: {
          enabled: true,
          frequency: 'daily'
      },
      // Other settings...
  };
  res.json(settingsData);
}
function settingsUpdateHandler(req, res) {
  // Update user settings
  const { theme, language, notifications, timezone, emailNotifications } = req.body;
  // Logic to update user settings in the database
  // For demonstration, let's assume the settings are updated successfully
  const updatedSettings = {
      theme,
      language,
      notifications,
      timezone,
      emailNotifications,
      // Other settings...
  };
  res.json({ message: 'Settings updated successfully', updatedSettings });
}

function featureHandler(req, res) {
  // Fetch data related to a specific feature
  const featureName = req.params.featureName;
  let featureData = {};
  
  // Example: Fetch data based on the feature name
  switch (featureName) {
    case 'feature1':
      featureData = {
        feature: featureName,
        description: 'Description of Feature 1',
        // Other feature-specific data...
      };
      break;
    case 'feature2':
      featureData = {
        feature: featureName,
        description: 'Description of Feature 2',
        // Other feature-specific data...
      };
      break;
    // Add more cases for additional features
    default:
      featureData = {
        feature: featureName,
        message: 'Feature not found'
      };
  }
  
  res.json(featureData);
}


app.get('/home', homeHandler);
app.get('/settings', settingsHandler);
app.put('/settings', settingsUpdateHandler);
app.get('/features/:featureName', featureHandler);