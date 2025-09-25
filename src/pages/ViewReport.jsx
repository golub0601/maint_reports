import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

export default function Reports() {
  const [unlocked, setUnlocked] = useState(false); // password gate
  const [password, setPassword] = useState("");
  const [reports, setReports] = useState([]);

  // check viewer password
  const handlePassword = () => {
    if (password === "viewer123") setUnlocked(true);
    else alert("Wrong password!");
  };

  // load reports from Firestore when unlocked
  useEffect(() => {
    if (unlocked) {
      const loadReports = async () => {
        const q = query(collection(db, "reports"), orderBy("date", "desc"));
        const snapshot = await getDocs(q);
        setReports(snapshot.docs.map((doc) => doc.data()));
      };
      loadReports();
    }
  }, [unlocked]);

  // show password input first
  if (!unlocked) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>Enter Viewer Password</h2>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handlePassword} style={{ marginLeft: "1rem" }}>
          Unlock
        </button>
      </div>
    );
  }

  // show reports list
  return (
    <div style={{ padding: "2rem" }}>
      <h2>Reports</h2>
      {reports.length === 0 ? (
        <p>No reports yet.</p>
      ) : (
        <ul>
          {reports.map((r, i) => (
            <li key={i}>
              <strong>{r.equipment}</strong>: {r.issue} <br />
              <small>{new Date(r.date.seconds * 1000).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
