// decidirIrrigacao.js

function decidirIrrigacao(temperatura, umidade) {
  // Convertemos as strings para números (caso venham assim)
    temperatura = parseFloat(temperatura);
    umidade = parseFloat(umidade);
  
    if (temperatura > 30 && umidade < 50) return true;
    if (temperatura > 25 && umidade < 40) return true;
    if (umidade < 30) return true;
  
    return false; //desliga o rele
  }
  
  module.exports = decidirIrrigacao;
  
