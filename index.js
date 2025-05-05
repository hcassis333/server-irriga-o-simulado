const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve arquivos estáticos
app.use(express.static('public'));

// Dados simulados
let irrigando = false;
let temperatura = 24 + Math.random() * 2;
let umidade = 60 + Math.random() * 5;

// Endpoint para pegar os dados
app.get('/api/status', (req, res) => {
  res.json({ irrigando, temperatura, umidade });
});

// Endpoint para ligar/desligar irrigação
app.get('/api/irrigar/:acao', (req, res) => {
  const { acao } = req.params;
  irrigando = (acao === 'ligar');
  res.json({ sucesso: true, irrigando });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
