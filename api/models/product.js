// models/product.js

const sql = require('mssql');

class Product {
  static async getAll() {
    try {
      const pool = await sql.connect();
      const result = await pool.request().query('SELECT * FROM products');
      return result.recordset;
    } catch (err) {
      throw err;
    }
  }

  static async create(product) {
    try {
      const pool = await sql.connect();
      const result = await pool.request()
        .input('Nombre', sql.VarChar(255), product.Nombre)
        .input('Descripcion', sql.Text, product.Descripcion)
        .input('Precio', sql.Decimal(10, 2), product.Precio)
        .input('Cantidad', sql.Int, product.Cantidad)
        .input('Categoria', sql.VarChar(50), product.Categoria)
        .input('ProveedorID', sql.Int, product.ProveedorID)
        .query('INSERT INTO products (Nombre, Descripcion, Precio, Cantidad, Categoria, ProveedorID) VALUES (@Nombre, @Descripcion, @Precio, @Cantidad, @Categoria, @ProveedorID)');
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
        .query('DELETE FROM products WHERE ID = @ID');
      return result.rowsAffected;
    } catch (err) {
      throw err;
    }
  }

  static async update(id, product) {
    try {
      const pool = await sql.connect();
      const result = await pool.request()
        .input('ID', sql.Int, id)
        .input('Nombre', sql.VarChar(255), product.Nombre)
        .input('Descripcion', sql.Text, product.Descripcion)
        .input('Precio', sql.Decimal(10, 2), product.Precio)
        .input('Cantidad', sql.Int, product.Cantidad)
        .input('Categoria', sql.VarChar(50), product.Categoria)
        .input('ProveedorID', sql.Int, product.ProveedorID)
        .query('UPDATE products SET Nombre = @Nombre, Descripcion = @Descripcion, Precio = @Precio, Cantidad = @Cantidad, Categoria = @Categoria, ProveedorID = @ProveedorID WHERE ID = @ID');
      return result.rowsAffected;
    } catch (err) {
      throw err;
    }
  }

  static async decreaseQuantity(id, quantity) {
    try {
      const pool = await sql.connect();
      const result = await pool.request()
        .input('id', sql.Int, id)
        .input('quantity', sql.Int, quantity)
        .query('UPDATE products SET Cantidad = Cantidad - @quantity WHERE ID = @id');
      return result.rowsAffected[0];
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Product;