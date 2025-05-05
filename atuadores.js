const { Gpio } = require("onoff");

module.exports.acionarBomba = async (zoneId, duration) => {
  const gpioPin = new Gpio(17, "out"); // GPIO17 conectado ao relé

  console.log(`Zona ${zoneId} -> Bomba LIGADA`);
  gpioPin.writeSync(1);

  await new Promise(resolve => setTimeout(resolve, duration * 1000));

  gpioPin.writeSync(0);
  gpioPin.unexport();

  console.log(`Zona ${zoneId} -> Bomba DESLIGADA`);
};
