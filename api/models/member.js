// models/member.js

const sql = require('mssql');

class Member {
  static async getAll() {
    try {
      const pool = await sql.connect();
      const result = await pool.request().query('SELECT * FROM members');
      return result.recordset;
    } catch (err) {
      throw err;
    }
  }

  static async create(member) {
    try {
      const pool = await sql.connect();

      // Calculate the end date as one month after the current date
      const endDate = new Date();
      endDate.setMonth(endDate.getMonth() + 1);

      const result = await pool.request()
        .input('Nombre', sql.VarChar(255), member.Nombre)
        .input('Email', sql.VarChar(255), member.Email)
        .input('Celular', sql.VarChar(20), member.Celular)
        .input('MembresiaAsignada', sql.Int, member.MembresiaAsignada)
        .input('FechaFinalizacion', sql.DateTime, endDate)
        .query('INSERT INTO members (Nombre, Email, Celular, MembresiaAsignada, FechaFinalizacion) VALUES (@Nombre, @Email, @Celular, @MembresiaAsignada, @FechaFinalizacion)');
      
      return result.recordset;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Member;