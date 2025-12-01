// Importar o modelo Order
const Order = require('../models/Order');

/**
 * CRIAR um novo pedido
 * Endpoint: POST /order
 * 
 * Recebe os dados do pedido e salva no banco de dados
 */
exports.createOrder = async (req, res) => {
    try {
        // Extrair dados do corpo da requisição
        const { numeroPedido, dataCriacao, valorTotal, itens } = req.body;

        // Validar se todos os campos obrigatórios foram enviados
        if (!numeroPedido || !valorTotal || !itens) {
            return res.status(400).json({
                erro: 'Dados incompletos. Envie numeroPedido, valorTotal e itens'
            });
        }

        // Validar se itens é um array e não está vazio
        if (!Array.isArray(itens) || itens.length === 0) {
            return res.status(400).json({
                erro: 'O pedido deve ter pelo menos um item'
            });
        }

        // Verificar se já existe um pedido com este número
        const pedidoExistente = await Order.findOne({ pedidoId: numeroPedido });
        if (pedidoExistente) {
            return res.status(400).json({
                erro: 'Já existe um pedido com este número'
            });
        }

        // Transformar os itens para o formato esperado pelo banco de dados
        const itensFormatados = itens.map(item => ({
            produtoId: item.idItem,
            quantidade: item.quantidadeItem,
            valor: item.valorItem
        }));

        // Criar novo pedido
        const novoPedido = new Order({
            pedidoId: numeroPedido,
            itens: itensFormatados,
            valorTotal: valorTotal,
            dataCriacao: dataCriacao || new Date() // Usa a data fornecida ou a data atual
        });

        // Salvar no banco de dados
        await novoPedido.save();

        // Retornar resposta de sucesso com o pedido criado
        res.status(201).json(novoPedido.formatResponse());

    } catch (error) {
        // Em caso de erro, retornar mensagem adequada
        console.error('Erro ao criar pedido:', error);
        res.status(500).json({
            erro: 'Erro ao criar pedido',
            mensagem: error.message
        });
    }
};

/**
 * OBTER dados de um pedido específico
 * Endpoint: GET /order/:numeroPedido
 * 
 * Busca e retorna os dados de um pedido pelo número
 */
exports.getOrder = async (req, res) => {
    try {
        // Obter o número do pedido da URL
        const { numeroPedido } = req.params;

        // Buscar o pedido no banco de dados
        const pedido = await Order.findOne({ pedidoId: numeroPedido });

        // Se não encontrar o pedido, retornar erro 404
        if (!pedido) {
            return res.status(404).json({
                erro: 'Pedido não encontrado'
            });
        }

        // Retornar o pedido encontrado
        res.status(200).json(pedido.formatResponse());

    } catch (error) {
        console.error('Erro ao buscar pedido:', error);
        res.status(500).json({
            erro: 'Erro ao buscar pedido',
            mensagem: error.message
        });
    }
};

/**
 * LISTAR todos os pedidos
 * Endpoint: GET /order/list
 * 
 * Retorna uma lista com todos os pedidos cadastrados
 */
exports.listOrders = async (req, res) => {
    try {
        // Buscar todos os pedidos no banco de dados
        // Ordenar por data de criação (mais recentes primeiro)
        const pedidos = await Order.find().sort({ dataCriacao: -1 });

        // Formatar cada pedido para a resposta
        const pedidosFormatados = pedidos.map(pedido => pedido.formatResponse());

        // Retornar a lista de pedidos
        res.status(200).json(pedidosFormatados);

    } catch (error) {
        console.error('Erro ao listar pedidos:', error);
        res.status(500).json({
            erro: 'Erro ao listar pedidos',
            mensagem: error.message
        });
    }
};

/**
 * ATUALIZAR um pedido existente
 * Endpoint: PUT /order/:numeroPedido
 * 
 * Atualiza os dados de um pedido específico
 */
exports.updateOrder = async (req, res) => {
    try {
        // Obter o número do pedido da URL
        const { numeroPedido } = req.params;

        // Obter novos dados do corpo da requisição
        const { valorTotal, itens } = req.body;

        // Buscar o pedido no banco de dados
        const pedido = await Order.findOne({ pedidoId: numeroPedido });

        // Se não encontrar o pedido, retornar erro 404
        if (!pedido) {
            return res.status(404).json({
                erro: 'Pedido não encontrado'
            });
        }

        // Atualizar apenas os campos que foram enviados
        if (valorTotal !== undefined) {
            pedido.valorTotal = valorTotal;
        }

        if (itens !== undefined) {
            // Validar se itens é um array
            if (!Array.isArray(itens)) {
                return res.status(400).json({
                    erro: 'Itens deve ser um array'
                });
            }

            // Transformar os itens para o formato do banco de dados
            pedido.itens = itens.map(item => ({
                produtoId: item.idItem,
                quantidade: item.quantidadeItem,
                valor: item.valorItem
            }));
        }

        // Salvar as alterações
        await pedido.save();

        // Retornar o pedido atualizado
        res.status(200).json(pedido.formatResponse());

    } catch (error) {
        console.error('Erro ao atualizar pedido:', error);
        res.status(500).json({
            erro: 'Erro ao atualizar pedido',
            mensagem: error.message
        });
    }
};

/**
 * DELETAR um pedido
 * Endpoint: DELETE /order/:numeroPedido
 * 
 * Remove um pedido do banco de dados
 */
exports.deleteOrder = async (req, res) => {
    try {
        // Obter o número do pedido da URL
        const { numeroPedido } = req.params;

        // Buscar e deletar o pedido
        const pedido = await Order.findOneAndDelete({ pedidoId: numeroPedido });

        // Se não encontrar o pedido, retornar erro 404
        if (!pedido) {
            return res.status(404).json({
                erro: 'Pedido não encontrado'
            });
        }

        // Retornar mensagem de sucesso
        res.status(200).json({
            mensagem: 'Pedido deletado com sucesso',
            pedidoDeletado: pedido.formatResponse()
        });

    } catch (error) {
        console.error('Erro ao deletar pedido:', error);
        res.status(500).json({
            erro: 'Erro ao deletar pedido',
            mensagem: error.message
        });
    }
};
