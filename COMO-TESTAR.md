# Como Testar a API - Guia Passo a Passo

Este guia explica como executar e testar a API de gerenciamento de pedidos.

## Passo 1: Iniciar o MongoDB

Antes de iniciar a API, você precisa ter o MongoDB rodando.

### Opção A: MongoDB Local

Se você tem o MongoDB instalado no seu computador, inicie o serviço:

**Windows:**
```bash
# Abra o prompt de comando como administrador
net start MongoDB
```

Ou navegue até a pasta de instalação do MongoDB e execute:
```bash
mongod
```

**Linux/Mac:**
```bash
sudo systemctl start mongod
```

### Opção B: MongoDB Atlas (Nuvem)

Se preferir usar o MongoDB na nuvem (gratuito):
1. Acesse https://www.mongodb.com/cloud/atlas
2. Crie uma conta gratuita
3. Crie um cluster gratuito
4. Obtenha a string de conexão
5. Substitua no arquivo `.env`:
```
MONGODB_URI=sua-string-de-conexao-aqui
```

## Passo 2: Instalar as Dependências

No terminal, navegue até a pasta do projeto e execute:

```bash
npm install
```

## Passo 3: Iniciar o Servidor

Execute o comando:

```bash
npm start
```

Ou para modo desenvolvimento com auto-reload:

```bash
npm run dev
```

Você deve ver:
```
Conectado ao MongoDB com sucesso!
Servidor rodando na porta 3000
Acesse: http://localhost:3000
```

## Passo 4: Testar os Endpoints

### Opção 1: Usando Postman

1. Abra o Postman
2. Importe o arquivo `postman-collection.json`
3. Execute cada requisição na ordem

### Opção 2: Usando cURL (Terminal)

Execute os comandos abaixo no terminal:

**1. Criar um pedido:**
```bash
curl -X POST http://localhost:3000/order -H "Content-Type: application/json" -d "{\"numeroPedido\": \"100B0115vdb-01\", \"dataCriacao\": \"2023-07-19T12:24:11.529960+00:00\", \"valorTotal\": 10000, \"itens\": [{\"idItem\": \"2434\", \"quantidadeItem\": 1, \"valorItem\": 1000}]}"
```

**2. Buscar o pedido criado:**
```bash
curl http://localhost:3000/order/100B0115vdb-01
```

**3. Listar todos os pedidos:**
```bash
curl http://localhost:3000/order/list
```

**4. Atualizar o pedido:**
```bash
curl -X PUT http://localhost:3000/order/100B0115vdb-01 -H "Content-Type: application/json" -d "{\"valorTotal\": 15000, \"itens\": [{\"idItem\": \"2434\", \"quantidadeItem\": 2, \"valorItem\": 1000}]}"
```

**5. Deletar o pedido:**
```bash
curl -X DELETE http://localhost:3000/order/100B0115vdb-01
```

### Opção 3: Usando Thunder Client (VS Code)

1. Instale a extensão "Thunder Client" no VS Code
2. Crie uma nova requisição
3. Configure conforme os exemplos do README.md

## Passo 5: Verificar Respostas

### Resposta de Sucesso ao Criar Pedido:
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

### Possíveis Erros:

**Erro: Pedido já existe**
```json
{
  "erro": "Já existe um pedido com este número"
}
```

**Erro: Pedido não encontrado**
```json
{
  "erro": "Pedido não encontrado"
}
```

**Erro: Dados incompletos**
```json
{
  "erro": "Dados incompletos. Envie numeroPedido, valorTotal e itens"
}
```

## Passo 6: Verificar no Banco de Dados

Para verificar os dados diretamente no MongoDB:

```bash
# Abrir o shell do MongoDB
mongo

# Selecionar o banco de dados
use pedidos

# Listar todos os pedidos
db.orders.find().pretty()
```

## Dicas de Teste

1. **Teste na ordem**: Crie um pedido antes de tentar buscá-lo
2. **Use IDs diferentes**: Para testar múltiplos pedidos, use números diferentes
3. **Verifique os códigos HTTP**: 200 (sucesso), 201 (criado), 404 (não encontrado), 400 (dados inválidos)
4. **Teste casos de erro**: Tente criar pedidos duplicados, buscar pedidos inexistentes, etc.

## Resolvendo Problemas

### MongoDB não conecta
- Verifique se o MongoDB está rodando
- Confira a string de conexão no arquivo `.env`
- Verifique se a porta 27017 está disponível

### Servidor não inicia
- Verifique se a porta 3000 está livre
- Execute `npm install` novamente
- Confira se o arquivo `.env` existe

### Erro ao criar pedido
- Verifique se todos os campos obrigatórios foram enviados
- Confira se o JSON está formatado corretamente
- Veja se o pedido não existe já no banco

## Próximos Passos

Depois de testar com sucesso:
1. Faça commits no Git com mensagens descritivas
2. Suba o código para o GitHub
3. Documente quaisquer melhorias que fez
