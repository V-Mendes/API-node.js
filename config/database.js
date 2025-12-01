// Importar a biblioteca mongoose para trabalhar com MongoDB
const mongoose = require('mongoose');

/**
 * Configuração e conexão com o banco de dados MongoDB
 * Esta função estabelece a conexão com o MongoDB usando a URL fornecida
 */
const connectDatabase = async () => {
  try {
    // Conectar ao MongoDB usando a URL das variáveis de ambiente
    await mongoose.connect(process.env.MONGODB_URI);
    
    console.log('Conectado ao MongoDB com sucesso!');
  } catch (error) {
    // Em caso de erro, exibir mensagem e encerrar a aplicação
    console.error('Erro ao conectar ao MongoDB:', error.message);
    process.exit(1); // Encerra o processo com código de erro
  }
};

// Exportar a função para ser usada em outros arquivos
module.exports = connectDatabase;
