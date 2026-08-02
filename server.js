const express = require('express');
const produtoRoutes = require('./routes/produtoRoutes');

const app = express();
app.use(express.json());

app.get('/', (req, res) => res.json({ status: 'API de Estoque rodando com sucesso!' }));
app.get('/api/status', (req, res) => res.json({ status: 'API de Estoque rodando com sucesso!' }));

app.use('/api', produtoRoutes);

app.listen(3000, () => console.log('API rodando na porta 3000'));
