import { useTheme } from "../context/ThemeContext";

const Header = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md py-4 px-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
          SmartPlanning AI
        </h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleDarkMode}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            {isDarkMode ? "Mode Clair" : "Mode Sombre"}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
