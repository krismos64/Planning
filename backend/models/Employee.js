const mysql = require("mysql2/promise");
const connectDB = require("../config/db");

class Employee {
  constructor(
    id,
    first_name,
    last_name,
    email,
    role,
    department,
    hours_worked,
    overtime_hours,
    created_at
  ) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.role = role;
    this.department = department;
    this.hours_worked = hours_worked;
    this.overtime_hours = overtime_hours;
    this.created_at = created_at;
  }

  static async findAll() {
    const connection = await connectDB();
    const [rows] = await connection.execute("SELECT * FROM employees");
    return rows.map(
      (row) =>
        new Employee(
          row.id,
          row.first_name,
          row.last_name,
          row.email,
          row.role,
          row.department,
          row.hours_worked,
          row.overtime_hours,
          row.created_at
        )
    );
  }

  static async findById(id) {
    const connection = await connectDB();
    const [rows] = await connection.execute(
      "SELECT * FROM employees WHERE id = ?",
      [id]
    );
    if (rows.length === 0) return null;
    const row = rows[0];
    return new Employee(
      row.id,
      row.first_name,
      row.last_name,
      row.email,
      row.role,
      row.department,
      row.hours_worked,
      row.overtime_hours,
      row.created_at
    );
  }

  static async create(employeeData) {
    const connection = await connectDB();
    const [result] = await connection.execute(
      "INSERT INTO employees (first_name, last_name, email, role, department, hours_worked, overtime_hours) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        employeeData.first_name,
        employeeData.last_name,
        employeeData.email,
        employeeData.role,
        employeeData.department,
        employeeData.hours_worked,
        employeeData.overtime_hours,
      ]
    );
    return result.insertId;
  }

  static async update(id, employeeData) {
    const connection = await connectDB();
    await connection.execute(
      "UPDATE employees SET first_name = ?, last_name = ?, email = ?, role = ?, department = ?, hours_worked = ?, overtime_hours = ? WHERE id = ?",
      [
        employeeData.first_name,
        employeeData.last_name,
        employeeData.email,
        employeeData.role,
        employeeData.department,
        employeeData.hours_worked,
        employeeData.overtime_hours,
        id,
      ]
    );
  }

  static async delete(id) {
    const connection = await connectDB();
    await connection.execute("DELETE FROM employees WHERE id = ?", [id]);
  }
}

module.exports = Employee;
