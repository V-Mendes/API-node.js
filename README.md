# API de Gerenciamento de Pedidos

## 📋 Descrição do Projeto

API REST desenvolvida em Node.js utilizando JavaScript para gerenciar pedidos. Este projeto foi criado como parte de um desafio acadêmico para aplicar conceitos de desenvolvimento backend, CRUD operations e integração com banco de dados.

## 🚀 Tecnologias Utilizadas

- **Node.js** - Ambiente de execução JavaScript
- **Express** - Framework web para Node.js
- **MongoDB** - Banco de dados NoSQL
- **Mongoose** - ODM para MongoDB
- **dotenv** - Gerenciamento de variáveis de ambiente

## 📁 Estrutura do Projeto

```
API/
├── models/
│   └── Order.js          # Modelo de dados do pedido
├── routes/
│   └── orderRoutes.js    # Definição das rotas
├── controllers/
│   └── orderController.js # Lógica de negócio
├── config/
│   └── database.js       # Configuração do banco de dados
├── server.js             # Arquivo principal do servidor
├── .env                  # Variáveis de ambiente
├── .gitignore            # Arquivos ignorados pelo Git
└── package.json          # Dependências do projeto
```

## 🔧 Instalação e Configuração

### Pré-requisitos

- Node.js instalado (versão 14 ou superior)
- MongoDB instalado localmente OU conta no MongoDB Atlas

### Passo a Passo

1. **Clone o repositório** (ou baixe os arquivos)
   ```bash
   git clone <seu-repositorio>
   cd API
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure o banco de dados**
   
   Copie o arquivo `.env.example` para `.env` e configure a URL do MongoDB:
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/pedidos
   ```
   
   Se estiver usando MongoDB Atlas, substitua pela sua connection string.

4. **Inicie o servidor**
   
   Modo desenvolvimento (com auto-reload):
   ```bash
   npm run dev
   ```
   
   Modo produção:
   ```bash
   npm start
   ```

5. **Verifique se o servidor está rodando**
   
   Você deve ver a mensagem:
   ```
   Servidor rodando na porta 3000
   Conectado ao MongoDB com sucesso!
   ```

## 📚 Endpoints da API

### 1. Criar um novo pedido (Obrigatório)
- **Método:** POST
- **URL:** `http://localhost:3000/order`
- **Body (JSON):**
  ```json
  {
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
  ```
- **Resposta de Sucesso (201):**
  ```json
  {
    "pedidoId": "100B0115vdb-01",
    "itens": [
      {
        "produtoId": "2434",
        "quantidade": 1,
        "valor": 1000
      }
    ],
    "valorTotal": 10000
  }
  ```

### 2. Obter dados de um pedido (Obrigatório)
- **Método:** GET
- **URL:** `http://localhost:3000/order/:numeroPedido`
- **Exemplo:** `http://localhost:3000/order/100B0115vdb-01`
- **Resposta de Sucesso (200):**
  ```json
  {
    "pedidoId": "100B0115vdb-01",
    "itens": [
      {
        "produtoId": "2434",
        "quantidade": 1,
        "valor": 1000
      }
    ],
    "valorTotal": 10000,
    "dataCriacao": "2023-07-19T12:24:11.529Z"
  }
  ```

### 3. Listar todos os pedidos (Opcional)
- **Método:** GET
- **URL:** `http://localhost:3000/order/list`
- **Resposta de Sucesso (200):**
  ```json
  [
    {
      "pedidoId": "100B0115vdb-01",
      "itens": [...],
      "valorTotal": 10000,
      "dataCriacao": "2023-07-19T12:24:11.529Z"
    }
  ]
  ```

### 4. Atualizar um pedido (Opcional)
- **Método:** PUT
- **URL:** `http://localhost:3000/order/:numeroPedido`
- **Exemplo:** `http://localhost:3000/order/100B0115vdb-01`
- **Body (JSON):**
  ```json
  {
    "valorTotal": 15000,
    "itens": [
      {
        "idItem": "2434",
        "quantidadeItem": 2,
        "valorItem": 1000
      }
    ]
  }
  ```

### 5. Deletar um pedido (Opcional)
- **Método:** DELETE
- **URL:** `http://localhost:3000/order/:numeroPedido`
- **Exemplo:** `http://localhost:3000/order/100B0115vdb-01`
- **Resposta de Sucesso (200):**
  ```json
  {
    "mensagem": "Pedido deletado com sucesso"
  }
  ```

## 🧪 Testando a API

Você pode testar a API usando:
- **Postman** - Importe os endpoints e faça os testes
- **Insomnia** - Alternativa ao Postman
- **cURL** - Linha de comando
- **Thunder Client** - Extensão do VS Code

### Exemplo de teste com cURL:

```bash
# Criar um pedido
curl -X POST http://localhost:3000/order \
  -H "Content-Type: application/json" \
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

# Buscar um pedido
curl http://localhost:3000/order/100B0115vdb-01

# Listar todos os pedidos
curl http://localhost:3000/order/list
```

## ⚠️ Tratamento de Erros

A API retorna mensagens de erro apropriadas:

- **400 Bad Request** - Dados inválidos ou faltando
- **404 Not Found** - Pedido não encontrado
- **500 Internal Server Error** - Erro no servidor

## 📝 Observações

- O projeto segue as convenções de nomenclatura do JavaScript
- O código está comentado para facilitar o entendimento
- Mensagens de erro são claras e compreensíveis
- Utiliza códigos HTTP apropriados para cada operação

## 🎓 Desenvolvido para

Projeto pessoal - Desenvolvimento de API em node.js usando o javascript.

---

**Autor:** Vinícius Mendes  
**Data:** 01/12/2025
