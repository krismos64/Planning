const mysql = require("mysql2/promise");
const connectDB = require("../config/db");

class VacationRequest {
  constructor(id, employeeId, startDate, endDate, status, reason) {
    this.id = id;
    this.employeeId = employeeId;
    this.startDate = startDate;
    this.endDate = endDate;
    this.status = status;
    this.reason = reason;
  }

  static async findAll() {
    const connection = await connectDB();
    const [rows] = await connection.execute("SELECT * FROM vacation_requests");
    return rows.map(
      (row) =>
        new VacationRequest(
          row.id,
          row.employeeId,
          row.startDate,
          row.endDate,
          row.status,
          row.reason
        )
    );
  }

  static async findById(id) {
    const connection = await connectDB();
    const [rows] = await connection.execute(
      "SELECT * FROM vacation_requests WHERE id = ?",
      [id]
    );
    if (rows.length === 0) return null;
    const row = rows[0];
    return new VacationRequest(
      row.id,
      row.employeeId,
      row.startDate,
      row.endDate,
      row.status,
      row.reason
    );
  }

  static async create(employeeId, startDate, endDate, status, reason) {
    const connection = await connectDB();
    const [result] = await connection.execute(
      "INSERT INTO vacation_requests (employeeId, startDate, endDate, status, reason) VALUES (?, ?, ?, ?, ?)",
      [employeeId, startDate, endDate, status, reason]
    );
    return result.insertId;
  }

  static async update(id, status) {
    const connection = await connectDB();
    await connection.execute(
      "UPDATE vacation_requests SET status = ? WHERE id = ?",
      [status, id]
    );
  }

  static async delete(id) {
    const connection = await connectDB();
    await connection.execute("DELETE FROM vacation_requests WHERE id = ?", [
      id,
    ]);
  }
}

module.exports = VacationRequest;
