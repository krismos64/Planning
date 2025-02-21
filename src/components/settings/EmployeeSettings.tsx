import React, { useState } from "react";

interface EmployeeSettings {
  defaultContractHours: number;
  defaultVacationDays: number;
  overtimeRules: {
    maxOvertimeHours: number;
    compensationType: "payment" | "timeoff";
    overtimeRate: number;
  };
  breakRules: {
    minBreakDuration: number;
    maxWorkingHoursBeforeBreak: number;
    mandatoryBreak: boolean;
  };
  schedulePreferences: {
    minHoursBetweenShifts: number;
    maxConsecutiveWorkDays: number;
    preferredShiftRotation: "forward" | "backward" | "none";
  };
}

const EmployeeSettings = () => {
  const [settings, setSettings] = useState<EmployeeSettings>({
    defaultContractHours: 35,
    defaultVacationDays: 25,
    overtimeRules: {
      maxOvertimeHours: 10,
      compensationType: "payment",
      overtimeRate: 1.25,
    },
    breakRules: {
      minBreakDuration: 45,
      maxWorkingHoursBeforeBreak: 6,
      mandatoryBreak: true,
    },
    schedulePreferences: {
      minHoursBetweenShifts: 11,
      maxConsecutiveWorkDays: 6,
      preferredShiftRotation: "forward",
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Appel API pour sauvegarder les paramètres
      console.log("Paramètres employés sauvegardés:", settings);
    } catch (error) {
      console.error("Erreur lors de la sauvegarde des paramètres:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-6">Paramètres des employés</h2>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Paramètres de base */}
        <div className="border-b border-gray-200 pb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Paramètres par défaut
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Heures contractuelles hebdomadaires
              </label>
              <input
                type="number"
                value={settings.defaultContractHours}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    defaultContractHours: parseInt(e.target.value),
                  })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Jours de congés annuels
              </label>
              <input
                type="number"
                value={settings.defaultVacationDays}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    defaultVacationDays: parseInt(e.target.value),
                  })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* Règles des heures supplémentaires */}
        <div className="border-b border-gray-200 pb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Heures supplémentaires
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Maximum d'heures sup. par semaine
              </label>
              <input
                type="number"
                value={settings.overtimeRules.maxOvertimeHours}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    overtimeRules: {
                      ...settings.overtimeRules,
                      maxOvertimeHours: parseInt(e.target.value),
                    },
                  })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Type de compensation
              </label>
              <select
                value={settings.overtimeRules.compensationType}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    overtimeRules: {
                      ...settings.overtimeRules,
                      compensationType: e.target.value as "payment" | "timeoff",
                    },
                  })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              >
                <option value="payment">Paiement</option>
                <option value="timeoff">Récupération</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Taux de majoration
              </label>
              <input
                type="number"
                step="0.25"
                value={settings.overtimeRules.overtimeRate}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    overtimeRules: {
                      ...settings.overtimeRules,
                      overtimeRate: parseFloat(e.target.value),
                    },
                  })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* Règles des pauses */}
        <div className="border-b border-gray-200 pb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Gestion des pauses
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Durée minimale de pause (minutes)
              </label>
              <input
                type="number"
                value={settings.breakRules.minBreakDuration}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    breakRules: {
                      ...settings.breakRules,
                      minBreakDuration: parseInt(e.target.value),
                    },
                  })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Heures max. avant pause obligatoire
              </label>
              <input
                type="number"
                value={settings.breakRules.maxWorkingHoursBeforeBreak}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    breakRules: {
                      ...settings.breakRules,
                      maxWorkingHoursBeforeBreak: parseInt(e.target.value),
                    },
                  })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* Préférences de planning */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Préférences de planning
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Heures min. entre les shifts
              </label>
              <input
                type="number"
                value={settings.schedulePreferences.minHoursBetweenShifts}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    schedulePreferences: {
                      ...settings.schedulePreferences,
                      minHoursBetweenShifts: parseInt(e.target.value),
                    },
                  })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Jours consécutifs max.
              </label>
              <input
                type="number"
                value={settings.schedulePreferences.maxConsecutiveWorkDays}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    schedulePreferences: {
                      ...settings.schedulePreferences,
                      maxConsecutiveWorkDays: parseInt(e.target.value),
                    },
                  })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Rotation des shifts
              </label>
              <select
                value={settings.schedulePreferences.preferredShiftRotation}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    schedulePreferences: {
                      ...settings.schedulePreferences,
                      preferredShiftRotation: e.target.value as
                        | "forward"
                        | "backward"
                        | "none",
                    },
                  })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              >
                <option value="forward">
                  Avant (matin → après-midi → nuit)
                </option>
                <option value="backward">
                  Arrière (nuit → après-midi → matin)
                </option>
                <option value="none">Aucune rotation</option>
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

export default EmployeeSettings;
