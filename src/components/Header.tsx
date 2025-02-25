import { useTheme } from "../context/ThemeContext";

const Header = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  // Exemple de déconnexion
  const handleLogout = () => {
    // Implémentez la logique de déconnexion ici
    // Par exemple, supprimer les tokens, informer le backend, etc.
    alert("Déconnecté !");
  };

  return (
    <header className="bg-light-50 dark:bg-dark-50 shadow-md py-4 px-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-light-600 dark:text-dark-500">
          SmartPlanning AI
        </h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-primary-DEFAULT text-white hover:bg-primary-light transition-colors"
          >
            {isDarkMode ? "🌙" : "☀️"}
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Déconnexion
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
