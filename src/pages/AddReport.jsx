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
    <div className="min-h-screen p-6 bg-gradient-to-br from-purple-900 via-cyan-900 to-purple-950 text-white">
      <div className="max-w-6xl mx-auto p-8 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl">
        <h2 className="text-3xl font-extrabold text-center mb-8 tracking-tight">
          📝 <span className="text-amber-400">Smjenski izvještaj</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          {rows.map((row, i) => (
            <div
              key={i}
              className="p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
            >
              {/* Short row */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                {["cjelina", "uredjaj", "odrzavaoci", "smjena"].map((field) => (
                  <div key={field} className="flex flex-col">
                    <label className="text-sm text-gray-300 mb-1 capitalize">
                      {field}
                    </label>
                    <input
                      type="text"
                      name={field}
                      value={row[field]}
                      onChange={(e) => handleChange(i, e)}
                      placeholder={`Unesite ${field}`}
                      className="bg-white/10 border border-white/20 rounded-lg p-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-300"
                    />
                  </div>
                ))}
                <div className="flex flex-col">
                  <label className="text-sm text-gray-300 mb-1">Zastoj (h)</label>
                  <input
                    type="number"
                    name="zastojH"
                    value={row.zastojH}
                    onChange={(e) => handleChange(i, e)}
                    placeholder="0"
                    className="bg-white/10 border border-white/20 rounded-lg p-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-300"
                  />
                </div>
              </div>

              {/* Long row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {["opis", "aktivnosti", "komentar"].map((field) => (
                  <div key={field} className="flex flex-col">
                    <label className="text-sm text-gray-300 mb-1 capitalize">
                      {field}
                    </label>
                    <textarea
                      name={field}
                      value={row[field]}
                      onChange={(e) => handleChange(i, e)}
                      placeholder={`Unesite ${field}`}
                      className="bg-white/10 border border-white/20 rounded-lg p-2 text-sm text-white placeholder-gray-400 h-20 resize-none focus:outline-none focus:ring-2 focus:ring-amber-300"
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
              className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-amber-300 font-medium shadow hover:bg-white/20 transition transform hover:scale-105"
            >
              ➕ Dodaj red
            </button>

            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-green-200 to-amber-400 text-cyan-950 font-semibold shadow hover:opacity-90 transition transform hover:scale-105"
            >
              ✅ Sačuvaj izvještaj
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
