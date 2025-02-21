import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useAuth } from "../context/AuthContext";
import { useCompany } from "../context/CompanyContext";

const Layout = () => {
  const { user } = useAuth();
  const { companyLogo, companyName } = useCompany();

  return (
    <div className="min-h-screen flex">
      <div className="flex flex-col w-64 bg-gray-800">
        <div className="p-4">
          {companyLogo ? (
            <img
              src={companyLogo}
              alt={companyName}
              className="h-12 w-auto mb-4"
            />
          ) : (
            <h1 className="text-xl font-bold text-white mb-4">{companyName}</h1>
          )}
        </div>
        <div className="flex-1">
          <Sidebar />
        </div>

        {/* Section utilisateur */}
        <div className="p-4 border-t border-gray-700">
          <div className="mb-4">
            <p className="text-sm text-gray-400">Connecté en tant que</p>
            <p className="text-white font-medium truncate">
              {user?.name || "Admin"}
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 bg-gray-100 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
