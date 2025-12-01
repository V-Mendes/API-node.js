// Importar o express para criar as rotas
const express = require('express');
const router = express.Router();

// Importar o controller com as funções de manipulação
const orderController = require('../controllers/orderController');

/**
 * ROTAS DA API DE PEDIDOS
 * 
 * Estas rotas definem os endpoints disponíveis na API
 * e conectam cada endpoint com a função correspondente no controller
 */

// Criar um novo pedido (Obrigatório)
// POST /order
router.post('/order', orderController.createOrder);

// Listar todos os pedidos (Opcional)
// GET /order/list
// IMPORTANTE: Esta rota deve vir ANTES da rota /order/:numeroPedido
// Caso contrário, "list" seria interpretado como um numeroPedido
router.get('/order/list', orderController.listOrders);

// Obter dados de um pedido específico (Obrigatório)
// GET /order/:numeroPedido
router.get('/order/:numeroPedido', orderController.getOrder);

// Atualizar um pedido (Opcional)
// PUT /order/:numeroPedido
router.put('/order/:numeroPedido', orderController.updateOrder);

// Deletar um pedido (Opcional)
// DELETE /order/:numeroPedido
router.delete('/order/:numeroPedido', orderController.deleteOrder);

// Exportar o router para ser usado no servidor principal
module.exports = router;
