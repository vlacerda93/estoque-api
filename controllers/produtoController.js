const fs = require('fs');
const path = require('path');

// Carrega as configurações dos submódulos
const regrasPath = path.join(__dirname, '../contracts/regras_produtos.json');
const configPath = path.join(__dirname, '../config/ambiente-dev.json');

const regras = JSON.parse(fs.readFileSync(regrasPath, 'utf-8'));
const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

exports.validarEAdicionar = (req, res) => {
  const { nome, preco } = req.body;

  if (!nome || preco === undefined) {
    return res.status(400).json({ erro: 'Nome e preco sao obrigatorios.' });
  }

  if (preco < regras.preco_minimo) {
    return res.status(400).json({ 
      erro: `Preco invalido. O preco minimo permitido e ${regras.preco_minimo}` 
    });
  }

  res.status(201).json({
    mensagem: 'Produto validado e criado com sucesso!',
    produto: { nome, preco },
    usando_sqs: config.features.usar_sqs
  });
};
