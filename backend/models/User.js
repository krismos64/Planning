const mysql = require("mysql2/promise");
const connectDB = require("../config/db");

class User {
  constructor(id, username, email, password, role) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.role = role;
  }

  static async findAll() {
    const connection = await connectDB();
    const [rows] = await connection.execute("SELECT * FROM users");
    return rows.map(
      (row) => new User(row.id, row.username, row.email, row.password, row.role)
    );
  }

  static async findById(id) {
    const connection = await connectDB();
    const [rows] = await connection.execute(
      "SELECT * FROM users WHERE id = ?",
      [id]
    );
    if (rows.length === 0) return null;
    const row = rows[0];
    return new User(row.id, row.username, row.email, row.password, row.role);
  }

  static async create(userData) {
    const connection = await connectDB();
    const [result] = await connection.execute(
      "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)",
      [userData.username, userData.email, userData.password, userData.role]
    );
    return result.insertId;
  }

  static async update(id, userData) {
    const connection = await connectDB();
    await connection.execute(
      "UPDATE users SET username = ?, email = ?, password = ?, role = ? WHERE id = ?",
      [userData.username, userData.email, userData.password, userData.role, id]
    );
  }

  static async delete(id) {
    const connection = await connectDB();
    await connection.execute("DELETE FROM users WHERE id = ?", [id]);
  }
}

module.exports = User;
