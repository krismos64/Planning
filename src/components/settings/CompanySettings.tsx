import React, { useState, useRef } from "react";

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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
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

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("Le fichier est trop volumineux. Maximum 2MB.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
        // Sauvegarder dans les paramètres
        setSettings((prev) => ({
          ...prev,
          logo: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Appel API pour sauvegarder les paramètres
      console.log("Paramètres sauvegardés:", settings);
      // Mettre à jour le logo dans le layout via le contexte
      // updateCompanyLogo(settings.logo);
    } catch (error) {
      console.error("Erreur lors de la sauvegarde des paramètres:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-6">Paramètres de l'entreprise</h2>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Section Logo */}
        <div className="border-b border-gray-200 pb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Logo</h3>
          <div className="flex items-start space-x-6">
            <div className="flex-shrink-0">
              <div className="h-32 w-32 border-2 border-gray-300 border-dashed rounded-lg flex items-center justify-center overflow-hidden">
                {logoPreview ? (
                  <img
                    src={logoPreview}
                    alt="Logo preview"
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <div className="text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </div>
            <div className="flex-1">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleLogoChange}
                accept="image/*"
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
              >
                Changer le logo
              </button>
              <p className="mt-2 text-sm text-gray-500">
                PNG, JPG jusqu'à 2MB. Dimensions recommandées : 200x200px
              </p>
            </div>
          </div>
        </div>

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
