import { ServerResponse } from 'http';
import { existsSync } from 'fs';
import { INestApplication, Logger } from '@nestjs/common';
import { static as st } from 'express';

/**
 * Serve static files using express
 *
 * @see https://expressjs.com/en/starter/static-files.html
 *
 * @param app Nest application
 * @param route Route to register
 * @param path Path to serve
 */
export function serveStaticFiles(app: INestApplication, route: string, path: string): void {
  // Check if file exists
  if (!existsSync(path)) {
    throw new Error(`Given path not exists: ${path}`);
  }
  // Register route
  app.use(
    route,
    st(path, {
      setHeaders: (res: ServerResponse) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        return res;
      },
    }),
  );
  // Log registered route to console
  Logger.log(`Route registered: ${route} -> ${path}`, 'ServeStaticFiles');
}
