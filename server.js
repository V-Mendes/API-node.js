/**
 * API DE GERENCIAMENTO DE PEDIDOS
 * Projeto Acadêmico
 * 
 * Este é o arquivo principal do servidor
 * Aqui configuramos o Express e iniciamos o servidor
 */

// Carregar variáveis de ambiente do arquivo .env
require('dotenv').config();

// Importar bibliotecas necessárias
const express = require('express');
const connectDatabase = require('./config/database');
const orderRoutes = require('./routes/orderRoutes');

// Criar a aplicação Express
const app = express();

/**
 * MIDDLEWARES
 * Configurações que processam as requisições antes de chegarem nas rotas
 */

// Middleware para fazer parse do JSON no corpo das requisições
app.use(express.json());

// Middleware para fazer parse de dados de formulário
app.use(express.urlencoded({ extended: true }));

// Middleware para adicionar headers CORS (permite requisições de outros domínios)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
});

/**
 * ROTA RAIZ
 * Apenas para verificar se o servidor está funcionando
 */
app.get('/', (req, res) => {
    res.json({
        mensagem: 'API de Gerenciamento de Pedidos está funcionando!',
        versao: '1.0.0',
        endpoints: {
            criar: 'POST /order',
            obter: 'GET /order/:numeroPedido',
            listar: 'GET /order/list',
            atualizar: 'PUT /order/:numeroPedido',
            deletar: 'DELETE /order/:numeroPedido'
        }
    });
});

/**
 * REGISTRAR ROTAS
 * Todas as rotas definidas em orderRoutes.js
 */
app.use('/', orderRoutes);

/**
 * MIDDLEWARE DE ERRO
 * Captura erros que não foram tratados nas rotas
 */
app.use((err, req, res, next) => {
    console.error('Erro não tratado:', err);
    res.status(500).json({
        erro: 'Erro interno do servidor',
        mensagem: err.message
    });
});

/**
 * ROTA NÃO ENCONTRADA (404)
 * Para URLs que não existem na API
 */
app.use((req, res) => {
    res.status(404).json({
        erro: 'Rota não encontrada',
        mensagem: `A rota ${req.method} ${req.url} não existe nesta API`
    });
});

/**
 * CONECTAR AO BANCO DE DADOS E INICIAR O SERVIDOR
 */
const PORT = process.env.PORT || 3000;

// Primeiro conecta ao banco de dados
connectDatabase()
    .then(() => {
        // Depois de conectar, inicia o servidor
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
            console.log(`Acesse: http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Falha ao iniciar o servidor:', error);
        process.exit(1);
    });

// Exportar o app para testes (opcional)
module.exports = app;
