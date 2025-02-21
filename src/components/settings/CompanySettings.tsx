import React, { useState } from "react";

interface CompanySettings {
  name: string;
  address: string;
  phone: string;
  email: string;
  logo?: string;
  workingHours: {
    start: string;
    end: string;
  };
  defaultBreakDuration: number;
  timeZone: string;
  language: string;
  currency: string;
}

const CompanySettings = () => {
  const [settings, setSettings] = useState<CompanySettings>({
    name: "Mon Entreprise",
    address: "",
    phone: "",
    email: "",
    workingHours: {
      start: "09:00",
      end: "17:00",
    },
    defaultBreakDuration: 60,
    timeZone: "Europe/Paris",
    language: "fr",
    currency: "EUR",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Appel API pour sauvegarder les paramètres
      console.log("Paramètres sauvegardés:", settings);
    } catch (error) {
      console.error("Erreur lors de la sauvegarde des paramètres:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-6">Paramètres de l'entreprise</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nom de l'entreprise
            </label>
            <input
              type="text"
              value={settings.name}
              onChange={(e) =>
                setSettings({ ...settings, name: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={settings.email}
              onChange={(e) =>
                setSettings({ ...settings, email: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Horaires par défaut
            </label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="time"
                value={settings.workingHours.start}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    workingHours: {
                      ...settings.workingHours,
                      start: e.target.value,
                    },
                  })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
              <input
                type="time"
                value={settings.workingHours.end}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    workingHours: {
                      ...settings.workingHours,
                      end: e.target.value,
                    },
                  })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Durée de pause par défaut (minutes)
            </label>
            <input
              type="number"
              value={settings.defaultBreakDuration}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  defaultBreakDuration: parseInt(e.target.value),
                })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
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

export default CompanySettings;
