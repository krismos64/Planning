import { useState, useEffect, createContext, useContext } from "react";
import {
  ThemeProvider as StyledThemeProvider,
  createGlobalStyle,
} from "styled-components";
import { lightTheme, darkTheme } from "../styles/theme";
import { themeTransition } from "../styles/animations";

// Création du contexte pour le thème
const ThemeContext = createContext({
  isDarkMode: false,
  toggleTheme: () => {},
});

// Hook personnalisé pour utiliser le thème
export const useTheme = () => useContext(ThemeContext);

// Styles globaux
const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    ${themeTransition}
  }
  
  body {
    font-family: ${({ theme }) => theme.typography.fontFamily};
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text.primary};
    line-height: 1.5;
    transition: background-color 0.3s ease, color 0.3s ease;
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-weight: ${({ theme }) => theme.typography.fontWeights.semiBold};
    margin-bottom: ${({ theme }) => theme.spacing.md};
    color: ${({ theme }) => theme.colors.text.primary};
  }
  
  h1 {
    font-size: ${({ theme }) => theme.typography.sizes["3xl"]};
  }
  
  h2 {
    font-size: ${({ theme }) => theme.typography.sizes["2xl"]};
  }
  
  h3 {
    font-size: ${({ theme }) => theme.typography.sizes.xl};
  }
  
  h4 {
    font-size: ${({ theme }) => theme.typography.sizes.lg};
  }
  
  h5 {
    font-size: ${({ theme }) => theme.typography.sizes.md};
  }
  
  h6 {
    font-size: ${({ theme }) => theme.typography.sizes.sm};
  }
  
  p {
    margin-bottom: ${({ theme }) => theme.spacing.md};
    color: ${({ theme }) => theme.colors.text.secondary};
  }
  
  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    transition: color 0.2s ease;
    
    &:hover {
      color: ${({ theme }) => `${theme.colors.primary}dd`};
    }
  }
  
  img {
    max-width: 100%;
    height: auto;
  }
  
  button, input, select, textarea {
    font-family: inherit;
  }
  
  ::selection {
    background-color: ${({ theme }) => `${theme.colors.primary}33`};
    color: ${({ theme }) => theme.colors.primary};
  }
  
  /* Scrollbar personnalisée */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  
  ::-webkit-scrollbar-track {
    background: ${({ theme }) => `${theme.colors.background}`};
  }
  
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => `${theme.colors.primary}66`};
    border-radius: 4px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => `${theme.colors.primary}99`};
  }
  
  /* Animation de transition pour le changement de thème */
  .theme-transition {
    transition: all 0.3s ease;
  }
  
  /* Classes d'animation */
  .fade-in {
    animation: fadeIn 0.3s ease-in-out;
  }
  
  .slide-in-up {
    animation: slideInUp 0.3s ease-in-out;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  
  @keyframes slideInUp {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

// Composant ThemeProvider
const ThemeProvider = ({ children }) => {
  // Récupérer le thème préféré de l'utilisateur depuis le localStorage ou les préférences du système
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme === "dark";
    }

    // Vérifier les préférences du système
    return (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  };

  const [isDarkMode, setIsDarkMode] = useState(getInitialTheme());

  // Mettre à jour le localStorage lorsque le thème change
  useEffect(() => {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");

    // Ajouter/supprimer la classe dark du body pour les styles CSS
    if (isDarkMode) {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
    }
  }, [isDarkMode]);

  // Écouter les changements de préférences du système
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e) => {
      // Ne mettre à jour que si l'utilisateur n'a pas explicitement choisi un thème
      if (!localStorage.getItem("theme")) {
        setIsDarkMode(e.matches);
      }
    };

    // Ajouter l'écouteur d'événements
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
    } else {
      // Fallback pour les anciens navigateurs
      mediaQuery.addListener(handleChange);
    }

    // Nettoyer l'écouteur d'événements
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleChange);
      } else {
        // Fallback pour les anciens navigateurs
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  // Fonction pour basculer entre les thèmes
  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  // Valeur du contexte
  const themeContextValue = {
    isDarkMode,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <StyledThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <GlobalStyle />
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
