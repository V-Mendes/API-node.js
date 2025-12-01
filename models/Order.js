// Importar mongoose para criar o schema e modelo
const mongoose = require('mongoose');

/**
 * Schema (estrutura) de um item do pedido
 * Define como cada item do pedido será armazenado
 */
const itemSchema = new mongoose.Schema({
    produtoId: {
        type: String,
        required: [true, 'O ID do produto é obrigatório']
    },
    quantidade: {
        type: Number,
        required: [true, 'A quantidade é obrigatória'],
        min: [1, 'A quantidade deve ser no mínimo 1']
    },
    valor: {
        type: Number,
        required: [true, 'O valor do item é obrigatório'],
        min: [0, 'O valor não pode ser negativo']
    }
});

/**
 * Schema (estrutura) do pedido
 * Define como os pedidos serão armazenados no banco de dados
 */
const orderSchema = new mongoose.Schema({
    pedidoId: {
        type: String,
        required: [true, 'O número do pedido é obrigatório'],
        unique: true, // Não permite pedidos duplicados
        trim: true // Remove espaços em branco nas pontas
    },
    itens: {
        type: [itemSchema], // Array de itens
        required: [true, 'O pedido deve ter pelo menos um item'],
        validate: {
            validator: function (itens) {
                return itens && itens.length > 0;
            },
            message: 'O pedido deve ter pelo menos um item'
        }
    },
    valorTotal: {
        type: Number,
        required: [true, 'O valor total é obrigatório'],
        min: [0, 'O valor total não pode ser negativo']
    },
    dataCriacao: {
        type: Date,
        default: Date.now // Se não for fornecida, usa a data atual
    }
}, {
    timestamps: true // Adiciona createdAt e updatedAt automaticamente
});

/**
 * Método para formatar o pedido no formato esperado pela API
 * Este método será usado quando retornarmos o pedido ao cliente
 */
orderSchema.methods.formatResponse = function () {
    return {
        pedidoId: this.pedidoId,
        itens: this.itens.map(item => ({
            produtoId: item.produtoId,
            quantidade: item.quantidade,
            valor: item.valor
        })),
        valorTotal: this.valorTotal,
        dataCriacao: this.dataCriacao
    };
};

// Criar o modelo Order baseado no schema
// Este modelo será usado para fazer operações no banco de dados
const Order = mongoose.model('Order', orderSchema);

// Exportar o modelo para ser usado em outros arquivos
module.exports = Order;
