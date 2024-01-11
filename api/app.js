const express = require('express');
const sql = require('mssql');
const providersRoutes = require('./routes/providers');
const productsRoutes = require('./routes/products');
const salesHistoryRoutes = require('./routes/sales_history');
const membershipRoutes = require('./routes/memberships');
const memberRoutes = require('./routes/members');



const config = {
    user: 'administrador_carlos',
    password: 'administrador',
    server: 'flowfit.mssql.somee.com', 
    database: 'flowfit',
    options: {
        encrypt: true,  // Si está usando encryptación
        trustServerCertificate: true  // Desactivar la verificación del certificado
    }
};

sql.connect(config).then(() => {
    console.log('Conexión a la base de datos exitosa!');
}).catch(err => {
    console.error('Error al conectar a la base de datos: ', err);
});

const app = express();

// Middleware para parsear el cuerpo de las solicitudes HTTP en formato JSON
app.use(express.json());

// Monta las rutas
app.use('/providers', providersRoutes);
app.use('/products', productsRoutes);
app.use('/sales_history', salesHistoryRoutes);
app.use('/memberships', membershipRoutes);
app.use('/members', memberRoutes);



// Inicia el servidor
const port = 3000;
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});

