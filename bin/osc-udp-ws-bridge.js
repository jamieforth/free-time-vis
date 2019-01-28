//import OSC from 'osc-js';
const OSC = require('osc-js');

const options = {
  udpServer: {
    port: 5005
  },
  wsServer: {
    port: 8081
  }
};

const osc = new OSC({ plugin: new OSC.BridgePlugin(options) });
osc.open();
