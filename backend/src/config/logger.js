let loggerConfig = true

if (process.stdout.isTTY) {
    loggerConfig = {
    transport: {
      target: 'pino-pretty',
    },
  }
}

export default loggerConfig