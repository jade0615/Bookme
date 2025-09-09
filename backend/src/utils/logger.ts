class Logger {
  info(message: string) {
    console.log(`[${new Date().toISOString()}] INFO: ${message}`);
  }

  error(message: string, error?: Error) {
    console.error(`[${new Date().toISOString()}] ERROR: ${message}`);
    if (error) {
      console.error(error.stack);
    }
  }

  warn(message: string) {
    console.warn(`[${new Date().toISOString()}] WARN: ${message}`);
  }

  debug(message: string) {
    if (process.env.NODE_ENV === 'development') {
      console.debug(`[${new Date().toISOString()}] DEBUG: ${message}`);
    }
  }
}

export const logger = new Logger();