import { useState } from "react";
import CompanySettings from "../components/settings/CompanySettings";
import EmployeeSettings from "../components/settings/EmployeeSettings";
import PreferencesSettings from "../components/settings/PreferencesSettings";

type SettingsTab =
  | "company"
  | "employees"
  | "preferences"
  | "security"
  | "notifications";

const Settings = () => {
  const [activeTab, setActiveTab] = useState<SettingsTab>("company");

  const tabs = [
    { id: "company" as SettingsTab, label: "Entreprise" },
    { id: "employees" as SettingsTab, label: "Employés" },
    { id: "preferences" as SettingsTab, label: "Préférences" },
    { id: "security" as SettingsTab, label: "Sécurité" },
    { id: "notifications" as SettingsTab, label: "Notifications" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "company":
        return <CompanySettings />;
      case "employees":
        return <EmployeeSettings />;
      case "preferences":
        return <PreferencesSettings />;
      case "security":
        return <div>Paramètres de sécurité à venir</div>;
      case "notifications":
        return <div>Configuration des notifications à venir</div>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900 pb-4">Paramètres</h1>
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm
                ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-6">{renderContent()}</div>
    </div>
  );
};

export default Settings;
