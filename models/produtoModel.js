// models/userModel.js
const pool = require('../db'); 

exports.findAll = async () => { 
    const text = 'SELECT id, nomeprod, preco, catprod, modelo, fabricante, estoque, locall FROM produtosInfo ORDER BY id'; 
    const result = await pool.query(text); 
    return result.rows;  
};
exports.findByField = async (tipo, valor) => {
    let text;
    let values;

    if (tipo === 'id') {
        text = 'SELECT id, nomeprod, preco, catprod, modelo, fabricante, estoque, locall FROM produtosInfo WHERE id = $1 ORDER BY id';
        values = [valor];
    } else {
        text = 'SELECT id, nomeprod, preco, catprod, modelo, fabricante, estoque, locall FROM produtosInfo WHERE nomeprod ILIKE $1 ORDER BY id';
        values = [`%${valor}%`];
    }

    const result = await pool.query(text, values);
    return result.rows;
};
exports.create = async (nomeprod, preco, catprod, modelo, fabricante, estoque, locall) => { 
    const text = `
        INSERT INTO produtosInfo (nomeprod, preco, catprod, modelo, fabricante, estoque, locall)
        VALUES($1, $2, $3, $4, $5, $6, $7) 
        RETURNING *`; 
    const values = [nomeprod, preco, catprod, modelo, fabricante, estoque, locall];  
    const result = await pool.query(text, values); 
    return result.rows[0]; 
};

exports.update = async (id, nomeprod, preco, catprod, modelo, fabricante, estoque, locall) =>{
    const text = `
        UPDATE produtosInfo 
        SET nomeprod = $1, preco = $2, catprod = $3, modelo = $4, fabricante = $5, estoque = $6, locall = $7
        WHERE id= $8 
        RETURNING *`;
    const values = [ nomeprod, preco, catprod, modelo, fabricante, estoque, locall, id];
    const result = await pool.query(text, values);
    return result.rows[0]; 
};

exports.delete = async (id) => {
    const text = 'DELETE FROM produtosInfo WHERE id = $1 RETURNING *';
    const values = [id];
    const result = await pool.query(text, values);
    return result.rows[0]; 
};