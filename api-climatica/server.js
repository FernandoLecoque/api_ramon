const mongoose = require('mongoose');
const app = require('./app');

const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/apiClimatica', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ Conectado ao MongoDB');
  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  });
})
.catch(err => {
  console.error('❌ Erro ao conectar ao MongoDB:', err);
});
