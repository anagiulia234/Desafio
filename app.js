
const express = require('express'); 
const app = express(); 
const produtoRoutes = require('./routes/produtoRoutes');  

app.use(express.static('public'));

app.use(express.json()); 
// Servir arquivos estáticos da pasta 'public'

app.use('/produtosInfo', produtoRoutes);  


app.listen(3000, () => { 
    console.log('Servidor rodando em http://localhost:3000'); 
});