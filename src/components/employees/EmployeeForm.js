import { useState } from "react";
import styled from "styled-components";
import { Button } from "../ui";
import { FormInput, FormSelect } from "../ui/Form";

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
`;

const departments = [
  { value: "Marketing", label: "Marketing" },
  { value: "Développement", label: "Développement" },
  { value: "Design", label: "Design" },
  { value: "Finance", label: "Finance" },
  { value: "RH", label: "RH" },
];

const roles = [
  { value: "Manager", label: "Manager" },
  { value: "Senior", label: "Senior" },
  { value: "Junior", label: "Junior" },
  { value: "Stagiaire", label: "Stagiaire" },
];

const statuses = [
  { value: "active", label: "Actif" },
  { value: "pending", label: "En attente" },
  { value: "inactive", label: "Inactif" },
];

const EmployeeForm = ({ employee, onSubmit, onDelete }) => {
  const [formData, setFormData] = useState({
    firstName: employee?.firstName || "",
    lastName: employee?.lastName || "",
    email: employee?.email || "",
    department: employee?.department || "",
    role: employee?.role || "",
    status: employee?.status || "active",
    startDate: employee?.startDate || new Date().toISOString().split("T")[0],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormGrid>
        <FormInput
          label="Prénom"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <FormInput
          label="Nom"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <FormInput
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <FormSelect
          label="Département"
          name="department"
          value={formData.department}
          onChange={handleChange}
          required
        >
          <option value="">Sélectionner un département</option>
          {departments.map((dept) => (
            <option key={dept.value} value={dept.value}>
              {dept.label}
            </option>
          ))}
        </FormSelect>
        <FormSelect
          label="Rôle"
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
        >
          <option value="">Sélectionner un rôle</option>
          {roles.map((role) => (
            <option key={role.value} value={role.value}>
              {role.label}
            </option>
          ))}
        </FormSelect>
        <FormSelect
          label="Statut"
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
        >
          {statuses.map((status) => (
            <option key={status.value} value={status.value}>
              {status.label}
            </option>
          ))}
        </FormSelect>
        <FormInput
          label="Date d'embauche"
          name="startDate"
          type="date"
          value={formData.startDate}
          onChange={handleChange}
          required
        />
      </FormGrid>

      <FormActions>
        {onDelete && (
          <Button type="button" onClick={onDelete} danger>
            Supprimer
          </Button>
        )}
        <Button type="submit" primary>
          {employee ? "Enregistrer" : "Ajouter"}
        </Button>
      </FormActions>
    </form>
  );
};

export default EmployeeForm;
