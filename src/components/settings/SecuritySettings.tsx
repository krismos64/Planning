import React, { useState } from "react";

interface SecuritySettings {
  password: {
    minLength: number;
    requireSpecialChar: boolean;
    requireNumber: boolean;
    requireUppercase: boolean;
    expirationDays: number;
  };
  authentication: {
    twoFactorEnabled: boolean;
    twoFactorMethod: "email" | "app" | "sms";
    sessionTimeout: number;
    maxLoginAttempts: number;
  };
  accessControl: {
    ipWhitelist: string[];
    restrictedHours: {
      enabled: boolean;
      start: string;
      end: string;
    };
  };
}

const SecuritySettings = () => {
  const [settings, setSettings] = useState<SecuritySettings>({
    password: {
      minLength: 8,
      requireSpecialChar: true,
      requireNumber: true,
      requireUppercase: true,
      expirationDays: 90,
    },
    authentication: {
      twoFactorEnabled: false,
      twoFactorMethod: "email",
      sessionTimeout: 30,
      maxLoginAttempts: 3,
    },
    accessControl: {
      ipWhitelist: [],
      restrictedHours: {
        enabled: false,
        start: "09:00",
        end: "18:00",
      },
    },
  });

  const [newIpAddress, setNewIpAddress] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [showPasswordSection, setShowPasswordSection] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Appel API pour sauvegarder les paramètres
      console.log("Paramètres de sécurité sauvegardés:", settings);
    } catch (error) {
      console.error("Erreur lors de la sauvegarde des paramètres:", error);
    }
  };

  const addIpToWhitelist = () => {
    if (newIpAddress && /^(\d{1,3}\.){3}\d{1,3}$/.test(newIpAddress)) {
      setSettings({
        ...settings,
        accessControl: {
          ...settings.accessControl,
          ipWhitelist: [...settings.accessControl.ipWhitelist, newIpAddress],
        },
      });
      setNewIpAddress("");
    }
  };

  const removeIpFromWhitelist = (ip: string) => {
    setSettings({
      ...settings,
      accessControl: {
        ...settings.accessControl,
        ipWhitelist: settings.accessControl.ipWhitelist.filter(
          (item) => item !== ip
        ),
      },
    });
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-6">Paramètres de sécurité</h2>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Section Authentification */}
        <div className="border-b border-gray-200 pb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Authentification à deux facteurs
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Activer l'authentification à deux facteurs
                </label>
                <p className="text-sm text-gray-500">
                  Ajoute une couche de sécurité supplémentaire à votre compte
                </p>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.authentication.twoFactorEnabled}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      authentication: {
                        ...settings.authentication,
                        twoFactorEnabled: e.target.checked,
                      },
                    })
                  }
                  className="h-4 w-4 text-blue-600 rounded border-gray-300"
                />
              </div>
            </div>

            {settings.authentication.twoFactorEnabled && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Méthode de vérification
                </label>
                <select
                  value={settings.authentication.twoFactorMethod}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      authentication: {
                        ...settings.authentication,
                        twoFactorMethod: e.target.value as
                          | "email"
                          | "app"
                          | "sms",
                      },
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                >
                  <option value="email">Email</option>
                  <option value="app">Application d'authentification</option>
                  <option value="sms">SMS</option>
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Section Contrôle d'accès */}
        <div className="border-b border-gray-200 pb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Contrôle d'accès
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Liste blanche IP
              </label>
              <div className="mt-2 flex space-x-2">
                <input
                  type="text"
                  value={newIpAddress}
                  onChange={(e) => setNewIpAddress(e.target.value)}
                  placeholder="Ex: 192.168.1.1"
                  className="flex-1 rounded-md border-gray-300 shadow-sm"
                />
                <button
                  type="button"
                  onClick={addIpToWhitelist}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Ajouter
                </button>
              </div>
              <div className="mt-2 space-y-2">
                {settings.accessControl.ipWhitelist.map((ip) => (
                  <div
                    key={ip}
                    className="flex items-center justify-between bg-gray-50 p-2 rounded"
                  >
                    <span>{ip}</span>
                    <button
                      type="button"
                      onClick={() => removeIpFromWhitelist(ip)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Supprimer
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700">
                  Heures d'accès restreintes
                </label>
                <input
                  type="checkbox"
                  checked={settings.accessControl.restrictedHours.enabled}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      accessControl: {
                        ...settings.accessControl,
                        restrictedHours: {
                          ...settings.accessControl.restrictedHours,
                          enabled: e.target.checked,
                        },
                      },
                    })
                  }
                  className="h-4 w-4 text-blue-600 rounded border-gray-300"
                />
              </div>
              {settings.accessControl.restrictedHours.enabled && (
                <div className="mt-2 grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-500">Début</label>
                    <input
                      type="time"
                      value={settings.accessControl.restrictedHours.start}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          accessControl: {
                            ...settings.accessControl,
                            restrictedHours: {
                              ...settings.accessControl.restrictedHours,
                              start: e.target.value,
                            },
                          },
                        })
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-500">Fin</label>
                    <input
                      type="time"
                      value={settings.accessControl.restrictedHours.end}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          accessControl: {
                            ...settings.accessControl,
                            restrictedHours: {
                              ...settings.accessControl.restrictedHours,
                              end: e.target.value,
                            },
                          },
                        })
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    />
                  </div>
                </div>
              )}
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

export default SecuritySettings;
