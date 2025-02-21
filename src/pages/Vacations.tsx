import { useState, useEffect } from "react";
import { api } from "../services/api";
import { useNotification } from "../hooks/useNotification";
import VacationRequestForm from "../components/vacations/VacationRequestForm";
import { VacationRequest } from "../types";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

const Vacations = () => {
  const [vacationRequests, setVacationRequests] = useState<VacationRequest[]>(
    []
  );
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const { showNotification } = useNotification();

  useEffect(() => {
    fetchVacationRequests();
  }, []);

  const fetchVacationRequests = async () => {
    try {
      const data = await api.vacations.getAll();
      setVacationRequests(data);
      setLoading(false);
    } catch (error) {
      console.error("Erreur lors du chargement des congés:", error);
      setLoading(false);
    }
  };

  const handleStatusChange = async (
    requestId: string,
    newStatus: "Approuvé" | "Refusé"
  ) => {
    try {
      await api.vacations.update(requestId, { status: newStatus });
      showNotification(
        "success",
        `Demande ${newStatus.toLowerCase()} avec succès`
      );
      fetchVacationRequests();
    } catch (error) {
      showNotification("error", "Erreur lors de la mise à jour du statut");
    }
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestion des Congés</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Nouvelle Demande
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Employé
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Dates
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Motif
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Statut
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {vacationRequests.map((request) => (
              <tr key={request._id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{request.employeeName}</td>
                <td className="px-6 py-4">
                  {format(new Date(request.startDate), "dd/MM/yyyy", {
                    locale: fr,
                  })}{" "}
                  -{" "}
                  {format(new Date(request.endDate), "dd/MM/yyyy", {
                    locale: fr,
                  })}
                </td>
                <td className="px-6 py-4">{request.reason || "-"}</td>
                <td className="px-6 py-4">
                  {request.status === "En attente" ? (
                    <div className="flex space-x-2">
                      <button
                        onClick={() =>
                          handleStatusChange(request._id, "Approuvé")
                        }
                        className="px-3 py-1 bg-green-100 text-green-800 rounded-full hover:bg-green-200 transition-colors"
                      >
                        Approuver
                      </button>
                      <button
                        onClick={() =>
                          handleStatusChange(request._id, "Refusé")
                        }
                        className="px-3 py-1 bg-red-100 text-red-800 rounded-full hover:bg-red-200 transition-colors"
                      >
                        Refuser
                      </button>
                    </div>
                  ) : (
                    <span
                      className={`px-3 py-1 rounded-full inline-block ${
                        request.status === "Approuvé"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {request.status}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <VacationRequestForm
          onSubmit={() => {
            setShowForm(false);
            fetchVacationRequests();
          }}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default Vacations;
