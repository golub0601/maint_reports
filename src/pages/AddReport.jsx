import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import "../styles/AddReport.css"; // import CSS file

export default function AddReport() {
  const emptyRow = {
    cjelina: "",
    uredjaj: "",
    zastojH: "",
    opis: "",
    aktivnosti: "",
    planirano: "",
    komentar: "",
    odrzavaoci: ""
  };

  const [rows, setRows] = useState([{...emptyRow}, {...emptyRow}, {...emptyRow}]);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedRows = [...rows];
    updatedRows[index][name] = value;
    setRows(updatedRows);
  };

  const addRow = () => {
    setRows([...rows, emptyRow]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "reports"), {
        rows,
        createdAt: Timestamp.now()
      });
      alert("✅ Report saved!");
      setRows([{ ...emptyRow }, { ...emptyRow }, { ...emptyRow }]);
    } catch (err) {
      console.error(err);
      alert("❌ Error saving report");
    }
  };

  return (
    <div className="report-container">
      <h2>📝 Smjenski izvjestaj</h2>
      <form onSubmit={handleSubmit}>
        <table className="report-table">
          <thead>
            <tr>
              <th>Cjelina pogona</th>
              <th>Uređaj</th> 
              <th>Zastoj (h)</th>
              <th>Opis kvara / zastoja</th>
              <th>Preduzete aktivnosti</th>
              <th>Planirana aktivnost</th>
              <th>Komentar</th>
              <th>Ime održavaoca / smjena</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i}>
                {Object.keys(emptyRow).map((field) => (
                  <td key={field}>
                    <input
                      type="text"
                      name={field}
                      value={row[field]}
                      onChange={(e) => handleChange(i, e)}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <div className="align-it-center pb-xl">
          <button type="button" onClick={addRow} className="btn secondary p-xl">
            ➕ Add Row
          </button>
        </div>
        <hr />
        <div className="buttons">
            <button type="submit" className="btn primary">
              ✅ Submit Report
            </button>
        </div>
      </form>
    </div>
  );
}
