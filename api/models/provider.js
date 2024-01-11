// models/provider.js

const sql = require('mssql');

class Provider {
  static async getAll() {
    try {
      const pool = await sql.connect();
      const result = await pool.request().query('SELECT * FROM providers');
      return result.recordset;
    } catch (err) {
      throw err;
    }
  }

  static async create(provider) {
    try {
      const pool = await sql.connect();
      const result = await pool.request()
        .input('Nombre', sql.VarChar(255), provider.Nombre)
        .input('Email', sql.VarChar(255), provider.Email)
        .input('Celular', sql.VarChar(20), provider.Celular)
        .input('Direccion', sql.VarChar(255), provider.Direccion)
        .query('INSERT INTO providers (Nombre, Email, Celular, Direccion) VALUES (@Nombre, @Email, @Celular, @Direccion)');
      return result.recordset;
    } catch (err) {
      throw err;
    }
  }

  static async delete(id) {
    try {
      const pool = await sql.connect();
      const result = await pool.request()
        .input('ID', sql.Int, id)
        .query('DELETE FROM providers WHERE ID = @ID');
      return result.rowsAffected;
    } catch (err) {
      throw err;
    }
  }

  static async update(id, provider) {
    try {
      const pool = await sql.connect();
      const result = await pool.request()
        .input('ID', sql.Int, id)
        .input('Nombre', sql.VarChar(255), provider.Nombre)
        .input('Email', sql.VarChar(255), provider.Email)
        .input('Celular', sql.VarChar(20), provider.Celular)
        .input('Direccion', sql.VarChar(255), provider.Direccion)
        .query('UPDATE providers SET Nombre = @Nombre, Email = @Email, Celular = @Celular, Direccion = @Direccion WHERE ID = @ID');
      return result.rowsAffected;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Provider;