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

app.post("/api/users/:accountID/complete-task", (req, res) => {
  const accountID = req.params.accountID;
  const { taskID } = req.body;

  if (!taskID) {
    return res.status(400).json({ error: "TaskID is not processed." });
  }

  const pathToTasks = path.join(__dirname, 'test_db', 'tasks.json');
  const pathToUsers = path.join(__dirname, 'test_db', 'users.json');
  
  FileSystem.readFile(pathToUsers, 'utf-8', (userErr, userData) => {
    if (userErr) {
      console.error("Error reading users.json:", userErr);
      return res.status(500).json({ error: "Failed to load users." })
    }

    fs.readFile(pathToTasks, 'utf8', (taskErr, task) => {
      if (taskErr) {
        console.error("Error reading tasks.json:", taskErr);
        return res.status(500).json({ error: "Failed to load tasks." });
      }

      const users = JSON.parse(userData);
      const tasks = JSON.parse(taskData);

      const userIndex = users.findIndex(u => u.accountID === accountID);
      if (userIndex === -1) {
        return res.status(404).json({ error: "User not found." });
      }

      const task = tasks.find(t => t.taskId === taskId);
      if (!task) {
        return res.status(404).json({ error: "Task not found." });
      }

      const user = users[userIndex];

      if (user.tasksCompleted.includes(taskID)) {
        return res.status(400).json({ error: "Task has already been completed before." })
      }

      user.xp += task.xpReward;
      user.level = Math.floor(user.xp / 50) + 1;
      user.tasksCompleted.push(taskID);

      fs.writeFile(usersPath, JSON.stringify(users, null, 2), 'utf8', (writeErr) => {
        if (writeErr) {
          console.error("Error writing users.json:", writeErr);
          return res.status(500).json({ error: "Failed to save user progress." });
        }
        res.json({ message: "Task completed!", user });
      });
    });
  });
});

app.post("/api/users", (req, res) => {
  const { accountID, name } = req.body;

  if (!accountId || !name) {
    return res.status(400).json({ error: "Account ID and Name are required." });
  }

  const pathToUsers = path.join(__dirname, 'test_db', 'users.json');

  fs.readFile(usersPath, 'utf8', (readErr, data) => {
    if (readErr) {
      console.error("Error reading users.json:", readErr);
      return res.status(500).json({ error: "Failed to load users." });
    }

    const users = JSON.parse(data);

    const existingUserCheck = users.find(u => u.accountId === accountId);
    if (existingUserCheck) {
      return res.status(400).json({ error: "User with this Account ID already exists." });
    }

    const newUser = {
      accountId,
      name,
      xp: 0,
      level: 1,
      tasksCompleted: []
    };

    users.push(newUser);

    fs.writeFile(usersPath, JSON.stringify(users, null, 2), 'utf8', (writeErr) => {
      if (writeErr) {
        console.error("Error writing users.json:", writeErr);
        return res.status(500).json({ error: "Failed to save new user." });
      }

      res.status(201).json({ message: "User created successfully!", user: newUser });
    });
  });
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));