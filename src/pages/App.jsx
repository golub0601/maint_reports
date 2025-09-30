import { Link } from "react-router-dom";

export default function Dashboard() {
  const gradients = [
    "bg-gradient-to-br from-lime-400 to-cyan-400",
    "bg-gradient-to-br from-emerald-400 to-indigo-500",
    "bg-gradient-to-br from-teal-400 to-cyan-500",
    "bg-gradient-to-br from-green-800 to-lime-500",
    "bg-gradient-to-br from-blue-400 to-teal-500",
    "bg-gradient-to-br from-teal-400 to-emerald-200",
  ];

  let gradientIndex = 0;
  const getGradient = () => gradients[gradientIndex++ % gradients.length];

  const Widget = ({ gradient, colSpan }) => {
    const colClass = {
      12: "lg:col-span-12",
      6: "lg:col-span-6",
      4: "lg:col-span-4",
      3: "lg:col-span-3",
    }[colSpan] || "lg:col-span-3";

    return (
      <div className={`col-span-12 ${colClass} ${gradient} rounded-xl shadow-lg p-6 text-white text-center`}>
        <h1 className="text-3xl font-bold mb-2">Continuous <span className="text-emerald-800">Reports</span></h1>
        <p className="text-white/80 mb-4">Keep track of all your maintenance records</p>
        <div className="flex gap-4 justify-center">
          <Link to="/add">
            <button className="px-5 py-2.5 rounded-xl bg-white text-lime-600 font-medium shadow hover:bg-white/90 transition">
              ➕ Add Report
            </button>
          </Link>
          <Link to="/reports">
            <button className="px-5 py-2.5 rounded-xl bg-white text-lime-600 font-medium shadow hover:bg-white/90 transition">
              📜 View Reports
            </button>
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen p-6">
      <div className="grid grid-cols-12 gap-6">
        {/* Row 1: 2 widgets */}
        <Widget gradient={getGradient()} colSpan={6} />
        <Widget gradient={getGradient()} colSpan={6} />

        {/* Row 2: 4 widgets */}
        <Widget gradient={getGradient()} colSpan={3} />
        <Widget gradient={getGradient()} colSpan={3} />
        <Widget gradient={getGradient()} colSpan={3} />
        <Widget gradient={getGradient()} colSpan={3} />

        {/* Row 3: 3 widgets */}
        <Widget gradient={getGradient()} colSpan={4} />
        <Widget gradient={getGradient()} colSpan={4} />
        <Widget gradient={getGradient()} colSpan={4} />

        {/* Row 4: 1 widget */}
        <Widget gradient={getGradient()} colSpan={12} />

        {/* Repeat first two rows */}
        <Widget gradient={getGradient()} colSpan={6} />
        <Widget gradient={getGradient()} colSpan={6} />
        <Widget gradient={getGradient()} colSpan={3} />
        <Widget gradient={getGradient()} colSpan={3} />
        <Widget gradient={getGradient()} colSpan={3} />
        <Widget gradient={getGradient()} colSpan={3} />
      </div>
    </div>
  );
}
