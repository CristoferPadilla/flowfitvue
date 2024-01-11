// models/membership.js

const sql = require('mssql');

class Membership {
  static async getAll() {
    try {
      const pool = await sql.connect();
      const result = await pool.request().query('SELECT * FROM memberships');
      return result.recordset;
    } catch (err) {
      throw err;
    }
  }

  static async create(membership) {
    try {
      const pool = await sql.connect();
      const result = await pool.request()
        .input('Titulo', sql.VarChar(255), membership.Titulo)
        .input('Descripcion', sql.Text, membership.Descripcion)
        .input('Precio', sql.Decimal(10, 2), membership.Precio)
        .query('INSERT INTO memberships (Titulo, Descripcion, Precio) VALUES (@Titulo, @Descripcion, @Precio)');
      return result.recordset;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Membership;