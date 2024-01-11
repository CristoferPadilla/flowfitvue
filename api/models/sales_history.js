// models/sales_history.js

const sql = require('mssql');

class SalesHistory {
  static async getAll() {
    try {
      const pool = await sql.connect();
      const result = await pool.request().query('SELECT * FROM sales_history');
      return result.recordset;
    } catch (err) {
      throw err;
    }
  }

  static async create(sale) {
    try {
      const pool = await sql.connect();
      const result = await pool.request()
        .input('ID_Producto', sql.Int, sale.ID_Producto)
        .input('Cantidad', sql.Int, sale.Cantidad)
        .input('PrecioVenta', sql.Decimal(10, 2), sale.PrecioVenta)
        .query('INSERT INTO sales_history (ID_Producto, Cantidad, PrecioVenta) VALUES (@ID_Producto, @Cantidad, @PrecioVenta)');
      return result.recordset;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = SalesHistory;