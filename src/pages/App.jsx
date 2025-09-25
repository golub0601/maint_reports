import { Link } from "react-router-dom";

export default function App() {
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Maintenance Reports</h1>
      <div style={{ marginTop: "2rem" }}>
        <Link to="/add">
          <button style={{ marginRight: "1rem" }}>➕ Add Report</button>
        </Link>
        <Link to="/reports">
          <button>📜 View Reports</button>
        </Link>
      </div>
    </div>
  );
}
