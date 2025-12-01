/**
 * ARQUIVO DE EXEMPLO PARA TESTAR A API
 * 
 * Este arquivo contém exemplos de requisições que podem ser feitas à API
 * usando ferramentas como Postman, Insomnia ou cURL
 * 
 * Execute este arquivo com: node test-api.js
 * (certifique-se de que o servidor está rodando antes)
 */

// =============================================================================
// EXEMPLOS DE REQUISIÇÕES EM JAVASCRIPT
// =============================================================================

// Nota: Este arquivo serve como documentação de como usar a API
// Para testar de verdade, você precisa usar uma ferramenta como Postman ou cURL

const baseURL = 'http://localhost:3000';

// =============================================================================
// 1. CRIAR UM NOVO PEDIDO
// =============================================================================
const exemploCreatPedido = {
    url: `${baseURL}/order`,
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: {
        "numeroPedido": "100B0115vdb-01",
        "dataCriacao": "2023-07-19T12:24:11.529960+00:00",
        "valorTotal": 10000,
        "itens": [
            {
                "idItem": "2434",
                "quantidadeItem": 1,
                "valorItem": 1000
            }
        ]
    }
};

console.log('1. CRIAR PEDIDO');
console.log('URL:', exemploCreatPedido.url);
console.log('Método:', exemploCreatPedido.method);
console.log('Body:', JSON.stringify(exemploCreatPedido.body, null, 2));
console.log('\n');

// =============================================================================
// 2. BUSCAR UM PEDIDO ESPECÍFICO
// =============================================================================
const exemploGetPedido = {
    url: `${baseURL}/order/100B0115vdb-01`,
    method: 'GET'
};

console.log('2. BUSCAR PEDIDO');
console.log('URL:', exemploGetPedido.url);
console.log('Método:', exemploGetPedido.method);
console.log('\n');

// =============================================================================
// 3. LISTAR TODOS OS PEDIDOS
// =============================================================================
const exemploListPedidos = {
    url: `${baseURL}/order/list`,
    method: 'GET'
};

console.log('3. LISTAR TODOS OS PEDIDOS');
console.log('URL:', exemploListPedidos.url);
console.log('Método:', exemploListPedidos.method);
console.log('\n');

// =============================================================================
// 4. ATUALIZAR UM PEDIDO
// =============================================================================
const exemploUpdatePedido = {
    url: `${baseURL}/order/100B0115vdb-01`,
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json'
    },
    body: {
        "valorTotal": 15000,
        "itens": [
            {
                "idItem": "2434",
                "quantidadeItem": 2,
                "valorItem": 1000
            }
        ]
    }
};

console.log('4. ATUALIZAR PEDIDO');
console.log('URL:', exemploUpdatePedido.url);
console.log('Método:', exemploUpdatePedido.method);
console.log('Body:', JSON.stringify(exemploUpdatePedido.body, null, 2));
console.log('\n');

// =============================================================================
// 5. DELETAR UM PEDIDO
// =============================================================================
const exemploDeletePedido = {
    url: `${baseURL}/order/100B0115vdb-01`,
    method: 'DELETE'
};

console.log('5. DELETAR PEDIDO');
console.log('URL:', exemploDeletePedido.url);
console.log('Método:', exemploDeletePedido.method);
console.log('\n');

// =============================================================================
// EXEMPLOS DE COMANDOS cURL
// =============================================================================

console.log('========================================');
console.log('COMANDOS cURL PARA TESTAR');
console.log('========================================\n');

console.log('# 1. Criar Pedido:');
console.log(`curl -X POST ${baseURL}/order \\
  -H "Content-Type: application/json" \\
  -d '{
    "numeroPedido": "100B0115vdb-01",
    "dataCriacao": "2023-07-19T12:24:11.529960+00:00",
    "valorTotal": 10000,
    "itens": [
      {
        "idItem": "2434",
        "quantidadeItem": 1,
        "valorItem": 1000
      }
    ]
  }'
`);

console.log('\n# 2. Buscar Pedido:');
console.log(`curl ${baseURL}/order/100B0115vdb-01`);

console.log('\n# 3. Listar Todos os Pedidos:');
console.log(`curl ${baseURL}/order/list`);

console.log('\n# 4. Atualizar Pedido:');
console.log(`curl -X PUT ${baseURL}/order/100B0115vdb-01 \\
  -H "Content-Type: application/json" \\
  -d '{
    "valorTotal": 15000,
    "itens": [
      {
        "idItem": "2434",
        "quantidadeItem": 2,
        "valorItem": 1000
      }
    ]
  }'
`);

console.log('\n# 5. Deletar Pedido:');
console.log(`curl -X DELETE ${baseURL}/order/100B0115vdb-01`);

console.log('\n========================================');
console.log('Use esses comandos no terminal ou Postman!');
console.log('========================================\n');
