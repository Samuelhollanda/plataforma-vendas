// src/index.ts
import express from 'express';
import produtoRoutes from './routes/produtoRoutes';
import vendaRoutes from './routes/vendaRoutes'

const app = express();

// Middleware MUITO IMPORTANTE: permite que o Express entenda requisições com corpo em JSON
app.use(express.json());

// Toda requisição que começar com /produtos será redirecionada para as rotas de produtos
app.use('/produtos', produtoRoutes);

app.use('/vendas', vendaRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});