import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

export default function AddReport() {
  const [unlocked, setUnlocked] = useState(false); // password gate
  const [password, setPassword] = useState("");
  const [equipment, setEquipment] = useState("");
  const [issue, setIssue] = useState("");

  // check password
  const handlePassword = () => {
    if (password === "admin123") setUnlocked(true);
    else alert("Wrong password!");
  };

  // submit form to Firestore
  const submitReport = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "reports"), {
      equipment,
      issue,
      date: Timestamp.now(),
    });
    alert("Report saved!");
    setEquipment("");
    setIssue("");
  };

  // show password input first
  if (!unlocked) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>Enter Admin Password</h2>
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

  // show form after password correct
  return (
    <div style={{ padding: "2rem" }}>
      <h2>Add New Report</h2>
      <form onSubmit={submitReport}>
        <div>
          <input
            type="text"
            placeholder="Equipment"
            value={equipment}
            onChange={(e) => setEquipment(e.target.value)}
            required
          />
        </div>
        <div>
          <textarea
            placeholder="Issue"
            value={issue}
            onChange={(e) => setIssue(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit Report</button>
      </form>
    </div>
  );
}
