const mysql = require("mysql2/promise");
const connectDB = require("../config/db");

class Project {
  constructor(id, name, description, startDate, endDate, status) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.startDate = startDate;
    this.endDate = endDate;
    this.status = status;
  }

  static async findAll() {
    const connection = await connectDB();
    const [rows] = await connection.execute("SELECT * FROM projects");
    return rows.map(
      (row) =>
        new Project(
          row.id,
          row.name,
          row.description,
          row.startDate,
          row.endDate,
          row.status
        )
    );
  }

  static async findById(id) {
    const connection = await connectDB();
    const [rows] = await connection.execute(
      "SELECT * FROM projects WHERE id = ?",
      [id]
    );
    if (rows.length === 0) return null;
    const row = rows[0];
    return new Project(
      row.id,
      row.name,
      row.description,
      row.startDate,
      row.endDate,
      row.status
    );
  }

  static async create(projectData) {
    const connection = await connectDB();
    const [result] = await connection.execute(
      "INSERT INTO projects (name, description, startDate, endDate, status) VALUES (?, ?, ?, ?, ?)",
      [
        projectData.name,
        projectData.description,
        projectData.startDate,
        projectData.endDate,
        projectData.status,
      ]
    );
    return result.insertId;
  }

  static async update(id, projectData) {
    const connection = await connectDB();
    await connection.execute(
      "UPDATE projects SET name = ?, description = ?, startDate = ?, endDate = ?, status = ? WHERE id = ?",
      [
        projectData.name,
        projectData.description,
        projectData.startDate,
        projectData.endDate,
        projectData.status,
        id,
      ]
    );
  }

  static async delete(id) {
    const connection = await connectDB();
    await connection.execute("DELETE FROM projects WHERE id = ?", [id]);
  }
}

module.exports = Project;
