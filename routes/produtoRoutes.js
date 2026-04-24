// routes/userRoutes.js 
const express = require('express'); 
const router = express.Router(); 
const produtoControllers = require('../controllers/produtoControllers'); 

// Lista todos os usuários
router.get('/', produtoControllers.getProduto); 
 
router.get('/buscar', produtoControllers.buscarProduto); 
 
// Cria um novo usuário (espera nome, cpf, email, telefone no body)
router.post('/', produtoControllers.createProduto); 
 
// Atualiza um usuário pelo ID (espera nome, cpf, email, telefone no body)
router.put('/:id', produtoControllers.updateProduto); 
 
// Remove um usuário pelo ID
router.delete('/:id', produtoControllers.deleteProduto); 
 
module.exports = router;