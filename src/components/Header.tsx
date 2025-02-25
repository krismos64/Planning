import { useTheme } from "../context/ThemeContext";

const Header = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <header className="bg-light-50 dark:bg-dark-50 shadow-md py-4 px-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-light-600 dark:text-dark-500">
          SmartPlanning AI
        </h1>
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full bg-primary-DEFAULT text-white hover:bg-primary-light transition-colors"
        >
          {isDarkMode ? "🌙" : "☀️"}
        </button>
      </div>
    </header>
  );
};

export default Header;
