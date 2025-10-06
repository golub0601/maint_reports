import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { usePageInfo } from "../hooks/usePageInfo";

export default function Reports() {
  usePageInfo({
    title: "📄 Smjenski izvještaji",
    shift: "Smjena B",
    showBack: true,
  });

  const [reports, setReports] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [focusedReport, setFocusedReport] = useState(null);

  useEffect(() => {
    const loadReports = async () => {
      const q = query(collection(db, "reports"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().createdAt?.toDate(),
      }));
      setReports(data);
      if (data.length > 0) setFocusedReport(data[0]);
    };
    loadReports();
  }, []);

  const handleDateSelect = (e) => {
    const chosenDate = new Date(e.target.value);
    setSelectedDate(e.target.value);
    const match = reports.find(
      (r) => r.date && r.date.toDateString() === chosenDate.toDateString()
    );
    setFocusedReport(match || null);
  };

  const latestReports = reports.slice(1, 4);

  return (
    <div className="flex flex-col lg:flex-row gap-8 pt-6 text-white">
      {/* Main Report Section */}
      <div className="flex-1">
        {focusedReport ? (
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-2 text-cyan-300">
              Izvještaj za {focusedReport.date?.toLocaleDateString("sr-RS")}
            </h2>
            {focusedReport.rows?.map((row, i) => (
              <div
                key={i}
                className="mb-6 p-4 rounded-lg bg-white/5 border border-white/10"
              >
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-sm">
                  <p><strong>Cjelina:</strong> {row.cjelina}</p>
                  <p><strong>Uređaj:</strong> {row.uredjaj}</p>
                  <p><strong>Održavaoci:</strong> {row.odrzavaoci}</p>
                  <p><strong>Smjena:</strong> {row.smjena}</p>
                  <p><strong>Zastoj (h):</strong> {row.zastojH}</p>
                </div>
                <div className="mt-2 text-sm text-white/90">
                  <p><strong>Opis:</strong> {row.opis}</p>
                  <p><strong>Aktivnosti:</strong> {row.aktivnosti}</p>
                  <p><strong>Komentar:</strong> {row.komentar}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-white/70">
            Nema izvještaja za odabrani datum.
          </div>
        )}
      </div>

      {/* Sidebar Section */}
      <div className="w-full lg:w-1/3 flex flex-col gap-6">
        {/* Date Picker */}
        <div className="bg-black/30 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-md">
          <h3 className="text-lg font-semibold mb-3 text-cyan-300">
            📅 Izaberi datum
          </h3>
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateSelect}
            className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:ring-2 focus:ring-cyan-400 focus:outline-none"
          />
        </div>

        {/* Latest Reports */}
        <div className="bg-black/30 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-cyan-300">
            🕒 Poslednji izvještaji
          </h3>
          <div className="flex flex-col gap-4">
            {latestReports.map((r) => (
              <button
                key={r.id}
                onClick={() => setFocusedReport(r)}
                className="text-left bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg p-4 transition"
              >
                <p className="text-cyan-300 font-medium">
                  {r.date?.toLocaleDateString("sr-RS")}
                </p>
                <p className="text-sm text-white/70">
                  {r.rows?.[0]?.opis?.slice(0, 80) || "Bez opisa"}...
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
