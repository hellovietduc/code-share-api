const restana = require('./loaders/restana');
const serverLogger = require('./loaders/logger')('server');
const config = require('./config');

const startServer = async () => {
    const app = restana();
    await app.start(config.port);
    serverLogger.success('started successfully');
    serverLogger.info('listening on port', config.port);
};

startServer();
