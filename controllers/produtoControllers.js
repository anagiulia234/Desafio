// controllers/produtoController.js
const prodModel = require('../models/produtoModel'); 

// 1. READ (GET /produto) - Buscar todos 
exports.getProduto = async (req, res) => { 
  try { 
    const produto = await prodModel.findAll(); 
    res.json(produto);  
  } catch (err) { 
    console.error('Erro ao buscar produtosInfo:', err); 
    res.status(500).json({ error: 'Erro interno ao buscar produtosInfo' }); 
  } 
}; 

// 2. CREATE (POST /musicas) - Criar novo 
exports.createProduto = async (req, res) => { 
    // Extraímos os 4 campos do corpo da requisição
    const {nomeProd, preco, catProd, modelo, fabricante, estoque, locall} = req.body;  
     
    // Validação: Todos os campos são obrigatórios para o cadastro
    if (!nomeProd || !preco || !catProd|| !modelo || !fabricante || !estoque || !locall) { 
        return res.status(400).json({ error: 'Os campos nomeProd, preco, catProd, modelo, fabricante, estoque, locall são obrigatórios.' }); 
    } 

    try { 
        // Passamos os 4 campos para o Model
        const newProduto = await prodModel.create(nomeProd, preco, catProd, modelo, fabricante, estoque, locall); 
        res.status(201).json(newProduto);  
    } catch (err) { 
        console.error('Erro ao criar produto:', err); 
        res.status(500).json({ error: 'Erro interno ao criar produtosInfo' }); 
    } 
}; 

// 3. UPDATE (PUT /musica/:id) - Atualizar existente 
exports.updateProduto = async (req, res) => { 
    const id = req.params.id; // Captura ID da URL 
    const { nomeProd, preco, catProd, modelo, fabricante, estoque, locall} = req.body; // Captura os novos dados
     
    // Validação mínima
    if (!nomeProd || !preco || !catProd|| !modelo || !fabricante || !estoque || !locall) { 
        return res.status(400).json({ error: 'Todos os campos são necessários para atualização.' }); 
    } 

    try { 
        // Passamos o ID e os novos campos para o Model
        const updateProduto= await prodModel.update(id, nomeProd, preco, catProd, modelo, fabricante, estoque, locall); 
         
        if (!updateProduto) { 
            return res.status(404).json({ error: 'Produto não encontrado.' }); 
        } 

        res.json(updateProduto);  
    } catch (err) { 
        console.error('Erro ao atualizar produto:', err); 
        res.status(500).json({ error: 'Erro interno ao atualizar produto' }); 
    } 
}; 

// 4. DELETE (DELETE /Musica/:id) - Remover existente 
exports.deleteProduto= async (req, res) => {
    const { id } = req.params;

    try {
        const deleteProduto = await prodModel.delete(id);
                 
        
        if (!deleteProduto) {
            return res.status(404).json({ error: 'Produto não encontrada para exclusão.' });
            
        }
        
        // Retornamos a musica deletada ou apenas uma mensagem de sucesso
        res.json({ message: 'Produto removido com sucesso', produto: deleteProduto });
    } catch (err) {
        console.error('Erro ao deletar produto:', err);
        res.status(500).json({ error: 'Erro interno ao deletar produto' });
    }
};