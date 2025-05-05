const sensor = require("node-dht-sensor");

module.exports.lerUmidade = async (zoneId) => {
  return new Promise((resolve, reject) => {
    const pin = 4; // GPIO conectado ao DHT (ex: GPIO4)
    const tipo = 22; // 22 para DHT22, 11 para DHT11

    sensor.read(tipo, pin, (err, temperature, humidity) => {
      if (err) {
        return reject(err);
      }
      console.log(`Zona ${zoneId} -> Umidade: ${humidity.toFixed(1)}%`);
      resolve(humidity.toFixed(1));
    });
  });
};
