const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/api/tasks", (req, res) => {
  const worldID = req.query.worldID;
  const pathToTasks = path.join(__dirname, 'test_db', 'tasks.json');

  FileSystem.readFile(pathToTasks, 'utf8', (err, data) => {
    if (err) {
      console.error("Unable to read tasks.json", err);
      return res.status(500).json({ error: "Unable to load tasks." });
    }

    let tasks = JSON.parse(data);

    if (worldID) {
      tasks = tasks.filter(task => task.worldID === worldID);
    }

    res.json(tasks);
  })
});

app.get("/api/users/:accountID", (req, res) => {
  const accountID = req.params.accountID;
  const pathToUsers = path.join(__dirname, 'test_db', 'users.json');

  FileSystem.readFile(pathToUsers, 'utf8', (err, data) => {
    if (err) {
      console.error("Unable to read users.json", err);
      return res.status(500).json({ error: "Unable to load users." });
    }

    const users = JSON.parse(data);
    const user = users.find(u => u.accountID === accountID);

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    res.json(user);
  })
})

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
