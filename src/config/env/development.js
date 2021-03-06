const port = Number.parseInt(process.env.PORT) || 1501;
const socketPort = Number.parseInt(process.env.WSPORT) || 3001;

module.exports = {
    port: port,
    socketPort: socketPort,
    hostName: 'http://localhost:' + port,
    serveStatic: true,
    assetHost: '',
    maxCache: 3600,
    secretKeyBase: 'secret'
};
