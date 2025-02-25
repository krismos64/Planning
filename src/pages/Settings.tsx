import { useEffect, useState } from "react";
import axios from "axios";
import CompanySettings from "../components/settings/CompanySettings";
import EmployeeSettings from "../components/settings/EmployeeSettings";
import PreferencesSettings from "../components/settings/PreferencesSettings";
import SecuritySettings from "../components/settings/SecuritySettings";
import NotificationSettings from "../components/settings/NotificationSettings";

type SettingsTab =
  | "company"
  | "employees"
  | "preferences"
  | "security"
  | "notifications";

interface Employee {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  department: string;
  hours_worked: number;
  overtime_hours: number;
  created_at: string;
}

const Settings = () => {
  const [activeTab, setActiveTab] = useState<SettingsTab>("company");
  const [user, setUser] = useState<Employee | null>(null);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    role: "",
    department: "",
  });

  const tabs = [
    { id: "company" as SettingsTab, label: "Entreprise" },
    { id: "employees" as SettingsTab, label: "Employés" },
    { id: "preferences" as SettingsTab, label: "Préférences" },
    { id: "security" as SettingsTab, label: "Sécurité" },
    { id: "notifications" as SettingsTab, label: "Notifications" },
  ];

  useEffect(() => {
    // Remplacez '1' par l'ID de l'utilisateur connecté
    axios
      .get(`http://localhost:5000/api/employees/1`)
      .then((response) => {
        setUser(response.data);
        setFormData({
          first_name: response.data.first_name,
          last_name: response.data.last_name,
          email: response.data.email,
          role: response.data.role,
          department: response.data.department,
        });
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des données de l'employé:",
          error
        );
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user) {
      axios
        .put(`http://localhost:5000/api/employees/${user.id}`, formData)
        .then((response) => {
          alert("Paramètres mis à jour avec succès !");
          setUser(response.data);
        })
        .catch((error) => {
          console.error("Erreur lors de la mise à jour des paramètres:", error);
        });
    } else {
      alert("Utilisateur non chargé !");
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "company":
        return <CompanySettings />;
      case "employees":
        return <EmployeeSettings />;
      case "preferences":
        return <PreferencesSettings />;
      case "security":
        return <SecuritySettings />;
      case "notifications":
        return <NotificationSettings />;
      default:
        return null;
    }
  };

  if (!user) return <div>Chargement...</div>;

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

      <div className="mt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Prénom</label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Nom</label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Rôle</label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Département</label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full"
              required
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-primary-DEFAULT text-white rounded hover:bg-primary-light"
          >
            Sauvegarder
          </button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
