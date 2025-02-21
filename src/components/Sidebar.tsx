import { useLocation, NavLink } from "react-router-dom";

interface SidebarProps {
  onItemClick?: () => void;
}

const Sidebar = ({ onItemClick }: SidebarProps) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const menuItems = [
    {
      path: "/dashboard",
      label: "Tableau de bord",
      icon: "dashboard",
    },
    {
      path: "/employees",
      label: "Employés",
      icon: "group",
    },
    {
      path: "/planning",
      label: "Planning",
      icon: "calendar_today",
    },
    {
      path: "/vacations",
      label: "Congés",
      icon: "beach_access",
    },
    {
      path: "/settings",
      label: "Paramètres",
      icon: "settings",
    },
  ];

  return (
    <aside className="w-64 bg-gray-800 text-white h-full">
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">SmartPlanning AI</h1>
        </div>

        <nav className="space-y-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onItemClick}
              className={({ isActive }) =>
                `flex items-center px-4 py-2 text-sm font-medium ${
                  isActive
                    ? "bg-gray-900 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`
              }
            >
              <span className="material-icons-outlined mr-3 text-xl">
                {item.icon}
              </span>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
