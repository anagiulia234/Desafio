// models/userModel.js 
const pool = require('../db'); 

// 1. GET (Listar todos)
exports.findAll = async () => { 
    const text = 'SELECT nomeProd, preco, catProd, modelo, fabricante, estoque, locall FROM produtosInfo ORDER BY id'; 
    const result = await pool.query(text); 
    return result.rows;  
};

// 2. POST (Criar novo)
exports.create= async (nomeProd, preco, catProd, modelo, fabricante, estoque, locall) => { 
    const text = `
        INSERT INTO produtosInfo(nomeProd, preco, catProd, modelo, fabricante, estoque, locall) 
        VALUES($1, $2, $3, $4, $5, $6, $7) 
        RETURNING *`; 
    const values = [nomeProd, preco, catProd, modelo, fabricante, estoque, locall];  
    const result = await pool.query(text, values); 
    return result.rows[0]; 
};

// 3. PUT (Atualizar existente)
exports.update = async (id, nomeProd, preco, catProd, modelo, fabricante, estoque, locall) => {
    const text = `
        UPDATE produtosInfo
        SET nomeProd= $1, preco = $2, catProd= $3, modelo = $4,  fabricante = $5, estoque = $6, locall = $7
        WHERE id = $8
        RETURNING *`;
    const values = [id, nomeProd, preco, catProd, modelo, fabricante, estoque, locall];
    const result = await pool.query(text, values);
    return result.rows[0]; // Retorna o registro atualizado ou undefined se não achar o ID
};

// 4. DELETE (Remover registro)
exports.delete = async (id) => {
    const text = 'DELETE FROM produtosInfo WHERE id = $1 RETURNING *';
    const values = [id];
    const result = await pool.query(text, values);
    return result.rows[0]; // Retorna o registro que foi deletado para confirmação
};
