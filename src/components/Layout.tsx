import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { ComponentProps } from "../types";

const Layout = (props: ComponentProps) => {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Sidebar fixe */}
      <div className="w-64 h-full bg-gray-800 flex-shrink-0">
        <Sidebar />
      </div>

      {/* Contenu principal */}
      <div className="flex flex-col flex-1 h-full overflow-hidden">
        {/* Header fixe */}
        <Header />

        {/* Zone de contenu principale avec scroll */}
        <main className="flex-1 overflow-y-auto bg-gray-100 p-6">
          <div className="container mx-auto">
            <Outlet />
          </div>
        </main>

        {/* Footer optionnel */}
        <footer className="mt-auto py-4 text-center text-gray-600 text-sm">
          <p>© 2024 SmartPlanning AI - Tous droits réservés</p>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
