const { Signale } = require('signale');

const loggers = new Map();

/**
 * Returns a logger instance with the specified scope.
 * @param {string} scope The scope name.
 * @returns {Signale} A logger instance.
 */
module.exports = scope => {
    if (loggers.has(scope)) return loggers.get(scope);
    const newLogger = new Signale({ scope });
    loggers.set(scope, newLogger);
    return newLogger;
};
