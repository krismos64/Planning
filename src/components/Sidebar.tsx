import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white">
      <div className="p-6">
        <nav className="space-y-4">
          <Link
            to="/dashboard"
            className="block px-4 py-2 rounded hover:bg-gray-700"
          >
            Dashboard
          </Link>
          <Link
            to="/employees"
            className="block px-4 py-2 rounded hover:bg-gray-700"
          >
            Employés
          </Link>
          <Link
            to="/planning"
            className="block px-4 py-2 rounded hover:bg-gray-700"
          >
            Planning
          </Link>
          <Link
            to="/vacations"
            className="block px-4 py-2 rounded hover:bg-gray-700"
          >
            Congés
          </Link>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
