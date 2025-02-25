const mysql = require("mysql2/promise");
const connectDB = require("../config/db");

class Task {
  constructor(id, name, description, projectId, assignedTo, status) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.projectId = projectId;
    this.assignedTo = assignedTo;
    this.status = status;
  }

  static async findAll() {
    const connection = await connectDB();
    const [rows] = await connection.execute("SELECT * FROM tasks");
    return rows.map(row => new Task(
      row.id,
      row.name,
      row.description,
      row.projectId,
      row.assignedTo,
      row.status
    ));
  }

  static async findById(id) {
    const connection = await connectDB();
    const [rows] = await connection.execute("SELECT * FROM tasks WHERE id = ?", [id]);
    if (rows.length === 0) return null;
    const row = rows[0];
    return new Task(
      row.id,
      row.name,
      row.description,
      row.projectId,
      row.assignedTo,
      row.status
    );
  }

  static async create(taskData) {
    const connection = await connectDB();
    const [result] = await connection.execute(
      "INSERT INTO tasks (name, description, projectId, assignedTo, status) VALUES (?, ?, ?, ?, ?)",
      [taskData.name, taskData.description, taskData.projectId, taskData.assignedTo, taskData.status]
    );
    return result.insertId;
  }

  static async update(id, taskData) {
    const connection = await connectDB();
    await connection.execute(
      "UPDATE tasks SET name = ?, description = ?, projectId = ?, assignedTo = ?, status = ? WHERE id = ?",
      [taskData.name, taskData.description, taskData.projectId, taskData.assignedTo, taskData.status, id]
    );
  }

  static async delete(id) {
    const connection = await connectDB();
    await connection.execute("DELETE FROM tasks WHERE id = ?", [id]);
  }
}

module.exports = Task; 