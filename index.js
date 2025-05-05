const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const decidirIrrigacao = require('./decidirIrrigacao');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));


// Simulação de sensor DHT22
const sensor = {
  read: function () {
    return {
      temperature: 25 + Math.random() * 10,  // 25–35 °C
      humidity: 40 + Math.random() * 30      // 40–70%
    };
  }
};

// GPIO (caso real em Raspberry Pi)
let Gpio;
let rele;
let modoSimulado = false;
let estadoRele = 0;

try {
  Gpio = require('onoff').Gpio;
  rele = new Gpio(17, 'out');
} catch (err) {
  console.warn('GPIO não disponível, entrando em modo simulado');
  modoSimulado = true;
}

// Estado atual da irrigação
let temperatura = 0;
let umidade = 0;
let irrigando = false;

// Rota raiz
app.get('/', (req, res) => {
  res.send('Servidor de Irrigação está rodando!');
});

// Rota para acionar o relé manualmente
app.post('/rele', (req, res) => {
  const { estado } = req.body;

  if (estado === 'ligar') {
    if (modoSimulado) {
      estadoRele = 1;
      return res.send('Rele (simulado) ligado');
    } else {
      rele.writeSync(1);
      return res.send('Rele ligado');
    }
  } else {
    if (modoSimulado) {
      estadoRele = 0;
      return res.send('Rele (simulado) desligado');
    } else {
      rele.writeSync(0);
      return res.send('Rele desligado');
    }
  }
});

// Rota de leitura atual
app.get('/leitura', (req, res) => {
  res.json({
    temperatura: temperatura.toFixed(1),
    umidade: umidade.toFixed(1),
    irrigando
  });
});

// Simulação automática com decisão
setInterval(() => {
  const leitura = sensor.read();
  temperatura = leitura.temperature;
  umidade = leitura.humidity;

  irrigando = decidirIrrigacao(temperatura, umidade);
  estadoRele = irrigando ? 1 : 0;

  console.log(`[IA] Temp: ${temperatura.toFixed(1)}°C | Umidade: ${umidade.toFixed(1)}% → ${irrigando ? 'IRRIGAR' : 'NÃO IRRIGAR'}`);
}, 5000);

// Início do servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
