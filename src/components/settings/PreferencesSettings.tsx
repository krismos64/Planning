import React, { useState } from "react";
import { useTheme } from "../../context/ThemeContext";

interface PreferencesSettings {
  theme: {
    mode: "light" | "dark" | "system";
    primaryColor: string;
    fontSize: "small" | "medium" | "large";
  };
  notifications: {
    email: boolean;
    desktop: boolean;
    sound: boolean;
  };
  display: {
    defaultView: "day" | "week" | "month";
    showWeekends: boolean;
    startOfWeek: "monday" | "sunday";
    timeFormat: "12h" | "24h";
  };
  language: {
    preferred: string;
    dateFormat: string;
    timeZone: string;
  };
}

const PreferencesSettings = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [settings, setSettings] = useState<PreferencesSettings>({
    theme: {
      mode: isDarkMode ? "dark" : "light",
      primaryColor: "#3B82F6",
      fontSize: "medium",
    },
    notifications: {
      email: true,
      desktop: true,
      sound: false,
    },
    display: {
      defaultView: "week",
      showWeekends: true,
      startOfWeek: "monday",
      timeFormat: "24h",
    },
    language: {
      preferred: "fr",
      dateFormat: "DD/MM/YYYY",
      timeZone: "Europe/Paris",
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Appel API pour sauvegarder les préférences
      console.log("Préférences sauvegardées:", settings);
      if (settings.theme.mode === "dark" && !isDarkMode) {
        toggleDarkMode();
      } else if (settings.theme.mode === "light" && isDarkMode) {
        toggleDarkMode();
      }
    } catch (error) {
      console.error("Erreur lors de la sauvegarde des préférences:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-6">Préférences</h2>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Section Thème */}
        <div className="border-b border-gray-200 pb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Personnalisation du thème
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Mode d'affichage
              </label>
              <select
                value={settings.theme.mode}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    theme: {
                      ...settings.theme,
                      mode: e.target.value as "light" | "dark" | "system",
                    },
                  })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              >
                <option value="light">Clair</option>
                <option value="dark">Sombre</option>
                <option value="system">Système</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Taille de police
              </label>
              <select
                value={settings.theme.fontSize}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    theme: {
                      ...settings.theme,
                      fontSize: e.target.value as "small" | "medium" | "large",
                    },
                  })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              >
                <option value="small">Petite</option>
                <option value="medium">Moyenne</option>
                <option value="large">Grande</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section Notifications */}
        <div className="border-b border-gray-200 pb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Notifications
          </h3>
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="emailNotif"
                checked={settings.notifications.email}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    notifications: {
                      ...settings.notifications,
                      email: e.target.checked,
                    },
                  })
                }
                className="h-4 w-4 text-blue-600 rounded border-gray-300"
              />
              <label
                htmlFor="emailNotif"
                className="ml-2 text-sm text-gray-700"
              >
                Notifications par email
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="desktopNotif"
                checked={settings.notifications.desktop}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    notifications: {
                      ...settings.notifications,
                      desktop: e.target.checked,
                    },
                  })
                }
                className="h-4 w-4 text-blue-600 rounded border-gray-300"
              />
              <label
                htmlFor="desktopNotif"
                className="ml-2 text-sm text-gray-700"
              >
                Notifications bureau
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="soundNotif"
                checked={settings.notifications.sound}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    notifications: {
                      ...settings.notifications,
                      sound: e.target.checked,
                    },
                  })
                }
                className="h-4 w-4 text-blue-600 rounded border-gray-300"
              />
              <label
                htmlFor="soundNotif"
                className="ml-2 text-sm text-gray-700"
              >
                Sons de notification
              </label>
            </div>
          </div>
        </div>

        {/* Section Affichage */}
        <div className="border-b border-gray-200 pb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Préférences d'affichage
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Vue par défaut
              </label>
              <select
                value={settings.display.defaultView}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    display: {
                      ...settings.display,
                      defaultView: e.target.value as "day" | "week" | "month",
                    },
                  })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              >
                <option value="day">Jour</option>
                <option value="week">Semaine</option>
                <option value="month">Mois</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Format de l'heure
              </label>
              <select
                value={settings.display.timeFormat}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    display: {
                      ...settings.display,
                      timeFormat: e.target.value as "12h" | "24h",
                    },
                  })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              >
                <option value="12h">12 heures</option>
                <option value="24h">24 heures</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            className="px-4 py-2 border rounded-md hover:bg-gray-50"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Enregistrer
          </button>
        </div>
      </form>
    </div>
  );
};

export default PreferencesSettings;
