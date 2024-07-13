import { createLogger, format, transports } from 'winston';

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  defaultMeta: { service: 'news-scraper' },
  transports: [
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.File({ filename: 'combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: format.simple(),
  }));
}

export class ScrapingError extends Error {
  constructor(public source: string, message: string) {
    super(message);
    this.name = 'ScrapingError';
  }
}

export function handleScrapingError(error: unknown, source: string) {
  if (error instanceof ScrapingError) {
    logger.error(`Scraping error for ${error.source}: ${error.message}`);
  } else if (error instanceof Error) {
    logger.error(`Unexpected error while scraping ${source}: ${error.message}`, { stack: error.stack });
  } else {
    logger.error(`Unknown error while scraping ${source}`, { error });
  }
}

export { logger };