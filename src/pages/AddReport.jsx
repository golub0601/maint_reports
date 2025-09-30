import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

export default function AddReport() {
  const emptyRow = {
    cjelina: "",
    uredjaj: "",
    zastojH: "",
    opis: "",
    aktivnosti: "",
    komentar: "",
    odrzavaoci: "",
    smjena: "",
  };

  const [rows, setRows] = useState([{ ...emptyRow }, { ...emptyRow }, { ...emptyRow }]);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedRows = [...rows];
    updatedRows[index][name] = value;
    setRows(updatedRows);
  };

  const addRow = () => {
    setRows([...rows, { ...emptyRow }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "reports"), {
        rows,
        createdAt: Timestamp.now(),
      });
      alert("✅ Report saved!");
      setRows([{ ...emptyRow }, { ...emptyRow }, { ...emptyRow }]);
    } catch (err) {
      console.error(err);
      alert("❌ Error saving report");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-md font-sans">
      <h2 className="text-2xl font-semibold text-center mb-6">📝 Smjenski izvještaj</h2>
      <form onSubmit={handleSubmit}>
        {rows.map((row, i) => (
          <div
            key={i}
            className="mb-6 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            {/* Short row */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
              {["cjelina", "uredjaj", "odrzavaoci", "smjena"].map((field) => (
                <div key={field} className="flex flex-col">
                  <label className="text-sm text-gray-600 mb-1 capitalize">{field}</label>
                  <input
                    type="text"
                    name={field}
                    value={row[field]}
                    onChange={(e) => handleChange(i, e)}
                    placeholder={`Unesite ${field}`}
                    className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              ))}
              <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-1">Zastoj (h)</label>
                <input
                  type="number"
                  name="zastojH"
                  value={row.zastojH}
                  onChange={(e) => handleChange(i, e)}
                  placeholder="0"
                  className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-20"
                />
              </div>
            </div>

            {/* Long row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {["opis", "aktivnosti", "komentar"].map((field) => (
                <div key={field} className="flex flex-col">
                  <label className="text-sm text-gray-600 mb-1 capitalize">{field}</label>
                  <textarea
                    name={field}
                    value={row[field]}
                    onChange={(e) => handleChange(i, e)}
                    placeholder={`Unesite ${field}`}
                    className="border border-gray-300 rounded-md p-2 text-sm h-20 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Buttons */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <button
            type="button"
            onClick={addRow}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
          >
            ➕ Dodaj red
          </button>

          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            ✅ Sacuvaj izvještaj
          </button>
        </div>
      </form>
    </div>
  );
}
