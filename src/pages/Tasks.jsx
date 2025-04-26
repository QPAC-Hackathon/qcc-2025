import { useParams } from "react-router-dom";
import mockUserData from "./mockData";
import "./Tasks.css";

function Tasks() {
  const { taskId } = useParams();
  const worldId = parseInt(taskId, 10);

  const userData = mockUserData;
  const worldProgress = userData.categoryProgress[worldId];

  if (!worldProgress) {
    return <div>World not found</div>;
  }

  const filteredTasks = userData.tasks.filter(
    (task) => task.category === worldId
  );

  return (
    <div className="tasks-page">
      <div className="header">
        <h1>Enrich Your Life</h1>
        <div className="score-box">{worldProgress.score}</div>
      </div>
      <p>welcome back {userData.name.toLowerCase()}</p>
      <h2>level {worldProgress.level}</h2>

      <div className="tasks-container">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task, index) => (
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
