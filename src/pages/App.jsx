import { Link } from "react-router-dom";

export default function Dashboard() {
  // Single glassmorphism style
  const glassStyle = "bg-white/10 backdrop-blur-lg border border-white/20";

  const Widget = ({ colSpan }) => {
    const colClass = {
      12: "lg:col-span-12",
      6: "lg:col-span-6",
      5: "lg:col-span-5",
      4: "lg:col-span-4",
      3: "lg:col-span-3",
      2: "lg:col-span-2",

    }[colSpan] || "lg:col-span-3";

    return (
      <div
        className={`col-span-12 ${colClass} ${glassStyle} rounded-2xl shadow-lg shadow-black 
        p-6 text-white text-center transition transform hover:scale-102 hover:shadow-xl`}
      >
        <h1 className="text-3xl font-extrabold mb-2 tracking-tight">
          Continuous <span className="text-cyan-500">Reports</span>
        </h1>
        <p className="text-white/70 mb-6">
          Keep track of all your maintenance records
        </p>
        <div className="flex gap-6 justify-center">
          <Link to="/add">
            <button className="hover:shadow-cyan-100 px-5 py-2.5 rounded-2xl border border-white/30 bg-white/20 text-blue-50 font-medium shadow hover:bg-white/60 hover:border-white/40 transition">
              Add Report
            </button>
          </Link>
          <Link to="/reports">
            <button className="hover:shadow-cyan-100 px-5 py-2.5 rounded-2xl border border-white/30 bg-white/20 text-blue-50 font-medium shadow hover:bg-white/60 hover:border-white/40 transition">
              View Reports
            </button>
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-12 gap-6">
        {/* Row 1: 2 widgets */}  
        <Widget colSpan={3} />
        <Widget colSpan={3} />
        <Widget colSpan={6} />

        {/* Row 2: 4 widgets */}
        <Widget colSpan={5} />
        <Widget colSpan={3} />
        <Widget colSpan={4} />

        {/* Row 3: 3 widgets */}
        <Widget colSpan={4} />
        <Widget colSpan={3} />
        <Widget colSpan={5} />
        
        
      </div>
    </div>
  );
}
