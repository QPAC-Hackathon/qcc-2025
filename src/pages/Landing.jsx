import { useNavigate } from "react-router-dom";
import "./Landing.css";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing">
      <h1 className="heading">Landing Page</h1>
      <button className="start-button" onClick={() => navigate("/map")}>
        Enrich Your Life
      </button>
    </div>
  );
}

export default Landing;
