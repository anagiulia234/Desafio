// ========================================
// VARIÁVEIS GLOBAIS
// ========================================

let produtoEmEdicao = null;

// ========================================
// FUNÇÕES AUXILIARES
// ========================================

// Mostra uma mensagem modal
function mostrarMensagem(mensagem, tipo = 'info') {
    const modal = document.getElementById('modalMessage');
    const modalText = document.getElementById('modalText');
    
    modalText.textContent = mensagem;
    modal.style.display = 'flex';
    
    // Define a cor baseado no tipo
    if (tipo === 'sucesso') {
        modal.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    } else if (tipo === 'erro') {
        modal.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    }
}

// Fecha o modal de mensagens
function fecharModal() {
    document.getElementById('modalMessage').style.display = 'none';
}

// Limpa o formulário
function limparFormulario() {
    document.getElementById('produtoForm').reset();
    produtoEmEdicao = null;
    document.querySelector('.form-section h2').textContent = 'Adicionar ou Editar produto';
}



// ========================================
// OPERAÇÕES COM A API
// ========================================

// Busca todos os produtos
async function carregarprodutosinfo() {
    const loadingMessage = document.getElementById('loadingMessage');
    const emptyMessage = document.getElementById('emptyMessage');
    const produtoList = document.getElementById('produtoList');
    
    loadingMessage.style.display = 'block';
    produtoList.innerHTML = '';
    
    try {
        const resposta = await fetch('/produtosinfo');
        
        if (!resposta.ok) {
            throw new Error('Erro ao buscar produtosinfo');
        }
        
        const produtosinfo = await resposta.json();
        loadingMessage.style.display = 'none';
        
        if (produtosinfo.length === 0) {
            emptyMessage.style.display = 'block';
            produtoList.innerHTML = '';
        } else {
            emptyMessage.style.display = 'none';
            exibirTabela(produtosinfo);
        }
    } catch (erro) {
        loadingMessage.style.display = 'none';
        emptyMessage.style.display = 'block';
        console.error('Erro:', erro);
        mostrarMensagem('Erro ao carregar os produtosinfo. Tente novamente.', 'erro');
    }
}

// Cria um novo produto
async function criarproduto(dados) {
    try {
        const resposta = await fetch('/produtosinfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });
        
        if (!resposta.ok) {
            const erro = await resposta.json();
            throw new Error(erro.error || 'Erro ao criar produto');
        }
        
        const novoproduto = await resposta.json();
        mostrarMensagem('produto cadastrado com sucesso!', 'sucesso');
        limparFormulario();
        carregarprodutosinfo();
        
    } catch (erro) {
        console.error('Erro:', erro);
        mostrarMensagem('Erro: ' + erro.message, 'erro');
    }
}

// Atualiza um produto
async function atualizarproduto(id, dados) {
    try {
        const resposta = await fetch(`/produtosinfo/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });
        
        if (!resposta.ok) {
            const erro = await resposta.json();
            throw new Error(erro.error || 'Erro ao atualizar produto');
        }
        
        const produtoAtualizado = await resposta.json();
        mostrarMensagem('produto atualizado com sucesso!', 'sucesso');
        limparFormulario();
        carregarprodutosinfo();
        
    } catch (erro) {
        console.error('Erro:', erro);
        mostrarMensagem('Erro: ' + erro.message, 'erro');
    }
}

// Deleta um produto
async function deletarproduto(id) {
    if (!confirm('Tem certeza que deseja deletar este produto?')) {
        return;
    }
    
    try {
        const resposta = await fetch(`/produtosinfo/${id}`, {
            method: 'DELETE'
        });
        
        if (!resposta.ok) {
            const erro = await resposta.json();
            throw new Error(erro.error || 'Erro ao deletar produto');
        }
        
        mostrarMensagem('produto removido com sucesso!', 'sucesso');
        carregarprodutosinfo();
        
    } catch (erro) {
        console.error('Erro:', erro);
        mostrarMensagem('Erro: ' + erro.message, 'erro');
    }
}

// ========================================
// EXIBIÇÃO DE DADOS
// ========================================

// Exibe a tabela de produtosInfo
function exibirTabela(produtosinfo) {
    const produtoList = document.getElementById('produtoList');
    
    let html = `
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>nomeprod</th>
                    <th>preco</th>
                    <th>catprod</th>
                    <th>modelo</th>
                    <th>Fabricante</th>
                    <th>Estoque</th>
                    <th>locall</th>
                   
                </tr>
            </thead>
            <tbody>
    `;
    
    produtosinfo.forEach(produtoInfo => {
        html += `
            <tr>
                <td>#${produtoInfo.id}</td>
                <td>${produtoInfo.nomeprod}</td>
                <td>${produtoInfo.preco}</td>
                <td>${produtoInfo.catprod}</td>
                <td>${produtoInfo.modelo}</td>
                <td>${produtoInfo.fabricante}</td>
                <td>${produtoInfo.estoque}</td>
                <td>${produtoInfo.locall}</td>
                <td class="acoes">
                    <button class="btn btn-edit" onclick="editarproduto(${produtoInfo.id}, '${produtoInfo.nomeprod}', '${produtoInfo.preco}', '${produtoInfo.catprod}', '${produtoInfo.modelo}', '${produtoInfo.fabricante}', '${produtoInfo.estoque}', '${produtoInfo.locall}')">✏️ Editar</button>
                    <button class="btn btn-danger" onclick="deletarproduto(${produtoInfo.id})">🗑️ Deletar</button>
                </td>
            </tr>
        `;
    });
    
    html += `
            </tbody>
        </table>
    `;
    
    produtoList.innerHTML = html;
}

// Carrega os dados do produto no formulário para edição
function editarproduto(id, nomeprod, preco, catprod, modelo, fabricante, estoque, locall) {
    produtoEmEdicao = id;
    
    document.getElementById('nomeprod').value = nomeprod;
    document.getElementById('preco').value = preco;
    document.getElementById('catprod').value = catprod;
    document.getElementById('modelo').value = modelo;
    document.getElementById('fabricante').value = fabricante;
    document.getElementById('estoque').value = estoque;
    document.getElementById('locall').value = locall;
    
    document.querySelector('.form-section h2').textContent =` Editando produto #${id}`;
    
    // Scroll até o formulário
    document.querySelector('.form-section').scrollIntoView({ behavior: 'smooth' });
}

// ========================================
// BUSCA E FILTRO
// ========================================

// Busca produtosinfo no backend
async function buscarprodutosinfo(tipo, valor) {
    const loadingMessage = document.getElementById('loadingMessage');
    const emptyMessage = document.getElementById('emptyMessage');
    const produtoList = document.getElementById('produtoList');
    
    loadingMessage.style.display = 'block';
    produtoList.innerHTML = '';
    
    try {
        const resposta = await fetch(`/produtosinfo/buscar?tipo=${tipo}&valor=${encodeURIComponent(valor)}`);
        
        if (!resposta.ok) {
            throw new Error('Erro ao buscar produtosinfo');
        }
        
        const produtosinfo = await resposta.json();
        loadingMessage.style.display = 'none';
        
        if (produtosinfo.length === 0) {
            emptyMessage.style.display = 'block';
            produtoList.innerHTML = '';
        } else {
            emptyMessage.style.display = 'none';
            exibirTabela(produtosinfo);
        }
    } catch (erro) {
        loadingMessage.style.display = 'none';
        emptyMessage.style.display = 'block';
        console.error('Erro:', erro);
        mostrarMensagem('Erro ao buscar os produtosinfo. Tente novamente.', 'erro');
    }
}

// Filtra produtosinfo pela busca (agora busca no backend)
function filtrarprodutosinfo() {
    const searchInput = document.getElementById('searchInput');
    const searchType = document.getElementById('searchType');
    const valor = searchInput.value.trim();
    
    if (valor === '') {
        // Se vazio, carrega todos
        carregarprodutosinfo();
    } else {
        // Busca no backend
        buscarprodutosinfo(searchType.value, valor);
    }
}

// ========================================
// EVENT LISTENERS
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Carrega os produtosInfo ao abrir a página
    carregarprodutosinfo();
    
    // Formulário de envio
    document.getElementById('produtoForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const nomeprod = document.getElementById('nomeprod').value.trim();
        const preco = document.getElementById('preco').value.trim();
        const catprod = document.getElementById('catprod').value.trim();
        const modelo = document.getElementById('modelo').value.trim();
        const fabricante = document.getElementById('fabricante').value.trim();
        const estoque = document.getElementById('estoque').value.trim();
        const locall = document.getElementById('locall').value.trim();
        
        // Validação básica
        if (!nomeprod || !preco || !catprod || !modelo || !fabricante || !estoque || !locall) {
            mostrarMensagem('Por favor, preencha todos os campos!', 'erro');
            return;
        }
        
        const dados = { nomeprod, preco, catprod, modelo, fabricante, estoque, locall };
        
        if (produtoEmEdicao) {
            atualizarproduto(produtoEmEdicao, dados);
        } else {
            criarproduto(dados);
        }
    });
    
    // Botão Limpar Formulário
    document.getElementById('btnLimpar').addEventListener('click', limparFormulario);
    
    // Botão Recarregar Lista
    document.getElementById('btnRecarregar').addEventListener('click', carregarprodutosinfo);
    
    // Botão Buscar
    document.getElementById('btnBuscar').addEventListener('click', filtrarprodutosinfo);
    
    // Busca em tempo real (opcional, pode ser removido se quiser apenas botão)
    document.getElementById('searchInput').addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            filtrarprodutosinfo();
        }
    });
    
    // Fechar modal ao clicar fora
    document.getElementById('modalMessage').addEventListener('click', function(e) {
        if (e.target === this) {
            fecharModal();
        }
    });
});