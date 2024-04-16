const logger4js = {
    appenders: {
      out: { type: 'stdout' },
      debug: {
        type: 'dateFile',
        filename: 'logs/debug/debug_file',
        pattern: '-yyyy-MM-dd.log',
        alwaysIncludePattern: true,
        keepFileExt: true,
      },
      'debug-filter': {
        type: 'logLevelFilter',
        appender: 'debug',
        level: 'debug',
        maxLevel: 'debug',
      },
      infos: {
        type: 'dateFile',
        filename: 'logs/infos/infos_file',
        pattern: '-yyyy-MM-dd.log',
        alwaysIncludePattern: true,
        keepFileExt: true,
      },
      'infos-filter': {
        type: 'logLevelFilter',
        appender: 'infos',
        level: 'info',
        maxLevel: 'info',
      },
      error: {
        type: 'dateFile',
        filename: 'logs/error/error_file',
        pattern: '-yyyy-MM-dd.log',
        alwaysIncludePattern: true,
        keepFileExt: true,
      },
      'error-filter': {
        type: 'logLevelFilter',
        appender: 'error',
        level: 'error',
        maxLevel: 'error',
      },
      default: {
        type: 'dateFile',
        filename: 'logs/default/default_file',
        pattern: '-yyyy-MM-dd.log',
        alwaysIncludePattern: true,
        keepFileExt: true,
      },
      warn: {
        type: 'dateFile',
        filename: 'logs/warn/warn_file',
        pattern: '-yyyy-MM-dd.log',
        alwaysIncludePattern: true,
        keepFileExt: true,
      },
      'warn-filter': {
        type: 'logLevelFilter',
        appender: 'warn',
        level: 'warn',
        maxLevel: 'warn',
      },
      trace: {
        type: 'dateFile',
        filename: 'logs/trace/trace_file',
        pattern: '-yyyy-MM-dd.log',
        alwaysIncludePattern: true,
        keepFileExt: true,
      },
      'trace-filter': {
        type: 'logLevelFilter',
        appender: 'trace',
        level: 'trace',
        maxLevel: 'trace',
      },
    },
    categories: {
      default: {
        appenders: [
          'out',
          'default',
          'debug-filter',
          'infos-filter',
          'debug-filter',
          'error-filter',
          'warn-filter',
          'trace-filter',
        ],
        level: 'trace',
      },
      debug: { appenders: ['debug', 'debug-filter'], level: 'debug' },
      infos: {
        appenders: [
          'infos-filter',
          'debug-filter',
          'error-filter',
          'warn-filter',
        ],
        level: 'debug',
      },
      error: { appenders: ['error', 'error-filter'], level: 'error' },
      warn: { appenders: ['warn', 'warn-filter'], level: 'warn' },
      trace: { appenders: ['trace', 'trace-filter'], level: 'trace' },

    },
  };
  
  const log4js = require('log4js');
  
  log4js.configure(logger4js);
  const logger = log4js.getLogger('ma-core');
  module.exports = logger