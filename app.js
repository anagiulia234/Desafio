const express = require('express'); 
const app = express(); 
const produtoRoutes = require('./routes/produtoRoutes');  
 
// Middleware para interpretar JSON no corpo das requisições 
app.use(express.json()); 
 
// Aplica as rotas de musicas com o prefixo '/music' 
// O caminho '/' no musicRoutes.js se torna '/music' aqui. 
app.use('/produtosInfo', produtoRoutes);  
 
// Inicia o servidor na porta 3000 
app.listen(4000, () => { 
    console.log('Servidor rodando em http://localhost:4000/'); 
}); 