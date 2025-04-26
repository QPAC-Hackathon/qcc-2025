import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import mockUserData from "./mockData";
import "./Tasks.css";

function Tasks() {
  const { taskId } = useParams();
  const worldId = parseInt(taskId, 10);

  const [userData, setUserData] = useState(null);
  const [tasks, setTasks] = useState([]);

  const accountId = 1; // hardcoded for now

  useEffect(() => {
    // Temporary: use mock data instead of fetching from API
    // setUserData(mockUserData);
    // setTasks(mockUserData.tasks.filter((task) => task.category === worldId));

    // Real fetch (commented out for now)

    async function fetchData() {
      const userRes = await fetch(
        `http://localhost:5000/api/users/${accountId}`
      );
      const userData = await userRes.json();
      setUserData(userData);

      const taskRes = await fetch(
        `http://localhost:5000/api/tasks?worldID=${worldId}`
      );
      const tasksData = await taskRes.json();
      setTasks(tasksData);
    }

    fetchData();
  }, [worldId]);

  if (!userData) return null; // don't render until userData is available

  const worldProgress = userData.categoryProgress[worldId];
  if (!worldProgress) {
    return <div>World not found</div>;
  }

  return (
    <div className="tasks-page">
      <div className="header">
        <h1>Enrich Your Life</h1>
        <div className="score-box">{worldProgress.score}</div>
      </div>
      <p>welcome back {userData.name.toLowerCase()}</p>
      <h2>level {worldProgress.level}</h2>

      <div className="tasks-container">
        {tasks.length > 0 ? (
          tasks.map((task, index) => (
            <div key={index} className="task-card">
              <span>{task.name}</span>
              <button className="idea-button">give me ideas</button>
            </div>
          ))
        ) : (
          <p>No tasks found for this world.</p>
        )}
      </div>
    </div>
  );
}

export default Tasks;
