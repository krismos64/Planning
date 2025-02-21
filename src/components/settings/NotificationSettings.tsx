import React, { useState } from "react";

interface NotificationSettings {
  emailNotifications: {
    enabled: boolean;
    frequency: "instant" | "daily" | "weekly";
    types: {
      planningUpdates: boolean;
      vacationRequests: boolean;
      employeeChanges: boolean;
      systemAlerts: boolean;
      reports: boolean;
    };
  };
  pushNotifications: {
    enabled: boolean;
    types: {
      planningUpdates: boolean;
      vacationRequests: boolean;
      employeeChanges: boolean;
      systemAlerts: boolean;
    };
    quietHours: {
      enabled: boolean;
      start: string;
      end: string;
    };
  };
  alerts: {
    sound: boolean;
    desktop: boolean;
    browser: boolean;
  };
}

const NotificationSettings = () => {
  const [settings, setSettings] = useState<NotificationSettings>({
    emailNotifications: {
      enabled: true,
      frequency: "instant",
      types: {
        planningUpdates: true,
        vacationRequests: true,
        employeeChanges: true,
        systemAlerts: true,
        reports: false,
      },
    },
    pushNotifications: {
      enabled: true,
      types: {
        planningUpdates: true,
        vacationRequests: true,
        employeeChanges: false,
        systemAlerts: true,
      },
      quietHours: {
        enabled: false,
        start: "22:00",
        end: "07:00",
      },
    },
    alerts: {
      sound: true,
      desktop: true,
      browser: true,
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Appel API pour sauvegarder les paramètres
      console.log("Paramètres de notification sauvegardés:", settings);
    } catch (error) {
      console.error("Erreur lors de la sauvegarde des paramètres:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-6">Paramètres de notification</h2>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Section Notifications par email */}
        <div className="border-b border-gray-200 pb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                Notifications par email
              </h3>
              <p className="text-sm text-gray-500">
                Gérez vos préférences de notifications par email
              </p>
            </div>
            <input
              type="checkbox"
              checked={settings.emailNotifications.enabled}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  emailNotifications: {
                    ...settings.emailNotifications,
                    enabled: e.target.checked,
                  },
                })
              }
              className="h-4 w-4 text-blue-600 rounded border-gray-300"
            />
          </div>

          {settings.emailNotifications.enabled && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Fréquence des notifications
                </label>
                <select
                  value={settings.emailNotifications.frequency}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      emailNotifications: {
                        ...settings.emailNotifications,
                        frequency: e.target.value as
                          | "instant"
                          | "daily"
                          | "weekly",
                      },
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                >
                  <option value="instant">Instantanée</option>
                  <option value="daily">Résumé quotidien</option>
                  <option value="weekly">Résumé hebdomadaire</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Types de notifications
                </label>
                {Object.entries(settings.emailNotifications.types).map(
                  ([key, value]) => (
                    <div key={key} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`email-${key}`}
                        checked={value}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            emailNotifications: {
                              ...settings.emailNotifications,
                              types: {
                                ...settings.emailNotifications.types,
                                [key]: e.target.checked,
                              },
                            },
                          })
                        }
                        className="h-4 w-4 text-blue-600 rounded border-gray-300"
                      />
                      <label
                        htmlFor={`email-${key}`}
                        className="ml-2 text-sm text-gray-700"
                      >
                        {key
                          .replace(/([A-Z])/g, " $1")
                          .replace(/^./, (str) => str.toUpperCase())}
                      </label>
                    </div>
                  )
                )}
              </div>
            </div>
          )}
        </div>

        {/* Section Notifications push */}
        <div className="border-b border-gray-200 pb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                Notifications push
              </h3>
              <p className="text-sm text-gray-500">
                Configurez les notifications sur votre appareil
              </p>
            </div>
            <input
              type="checkbox"
              checked={settings.pushNotifications.enabled}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  pushNotifications: {
                    ...settings.pushNotifications,
                    enabled: e.target.checked,
                  },
                })
              }
              className="h-4 w-4 text-blue-600 rounded border-gray-300"
            />
          </div>

          {settings.pushNotifications.enabled && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Types de notifications
                </label>
                {Object.entries(settings.pushNotifications.types).map(
                  ([key, value]) => (
                    <div key={key} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`push-${key}`}
                        checked={value}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            pushNotifications: {
                              ...settings.pushNotifications,
                              types: {
                                ...settings.pushNotifications.types,
                                [key]: e.target.checked,
                              },
                            },
                          })
                        }
                        className="h-4 w-4 text-blue-600 rounded border-gray-300"
                      />
                      <label
                        htmlFor={`push-${key}`}
                        className="ml-2 text-sm text-gray-700"
                      >
                        {key
                          .replace(/([A-Z])/g, " $1")
                          .replace(/^./, (str) => str.toUpperCase())}
                      </label>
                    </div>
                  )
                )}
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium text-gray-700">
                    Mode Ne pas déranger
                  </label>
                  <input
                    type="checkbox"
                    checked={settings.pushNotifications.quietHours.enabled}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        pushNotifications: {
                          ...settings.pushNotifications,
                          quietHours: {
                            ...settings.pushNotifications.quietHours,
                            enabled: e.target.checked,
                          },
                        },
                      })
                    }
                    className="h-4 w-4 text-blue-600 rounded border-gray-300"
                  />
                </div>

                {settings.pushNotifications.quietHours.enabled && (
                  <div className="mt-2 grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-500">
                        Début
                      </label>
                      <input
                        type="time"
                        value={settings.pushNotifications.quietHours.start}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            pushNotifications: {
                              ...settings.pushNotifications,
                              quietHours: {
                                ...settings.pushNotifications.quietHours,
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
                        value={settings.pushNotifications.quietHours.end}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            pushNotifications: {
                              ...settings.pushNotifications,
                              quietHours: {
                                ...settings.pushNotifications.quietHours,
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
          )}
        </div>

        {/* Section Alertes */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Préférences d'alertes
          </h3>
          <div className="space-y-4">
            {Object.entries(settings.alerts).map(([key, value]) => (
              <div key={key} className="flex items-center">
                <input
                  type="checkbox"
                  id={`alert-${key}`}
                  checked={value}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      alerts: {
                        ...settings.alerts,
                        [key]: e.target.checked,
                      },
                    })
                  }
                  className="h-4 w-4 text-blue-600 rounded border-gray-300"
                />
                <label
                  htmlFor={`alert-${key}`}
                  className="ml-2 text-sm text-gray-700"
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </label>
              </div>
            ))}
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

export default NotificationSettings;
