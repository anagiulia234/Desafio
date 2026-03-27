// db.js
require('dotenv').config(); // Carrega as variáveis do .env
const { Pool } = require('pg');

// Configuração do Pool usando as variáveis de ambiente
const config = {
user: process.env.PG_USER,
host: process.env.PG_HOST,
database: process.env.PG_DATABASE,
password: process.env.PG_PASSWORD,
port: process.env.PG_PORT,
};

// Criando o Pool de conexões (será exportado)
const pool = new Pool(config);

// Log de evento de erro para monitoramento
pool.on('error', (err, prod) => {
console.error('Erro inesperado no produto do Pool', err);
});

// Exporta o Pool, que será usado para executar as consultas
module.exports = pool;