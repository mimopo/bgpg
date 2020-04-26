import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { join } from 'path';
import { existsSync } from 'fs';
import { ServerResponse } from 'http';
import { Logger } from '@nestjs/common';

// Static directories to serve
const STATICS = [{ url: '/', path: join(__dirname, '..', 'static') }];
const FRONTEND_PATH = join(__dirname, '..', 'frontend');
// Serve the frontend app (when running inside docker)
if (existsSync(FRONTEND_PATH)) {
  STATICS.push({ url: '/', path: FRONTEND_PATH });
  STATICS.push({ url: '*', path: join(FRONTEND_PATH, 'index.html') });
}

// Nest bootstrap
async function bootstrap() {
  // Create Nest App
  const app = await NestFactory.create(AppModule);
  // Static files
  STATICS.forEach(({ url, path }) => {
    Logger.log(`Static route registered: ${url} -> ${path}`, 'StaticFiles');
    app.use(
      url,
      express.static(path, {
        setHeaders: (res: ServerResponse, path, stat) => {
          res.setHeader('Access-Control-Allow-Origin', '*');
          return res;
        },
      }),
    );
  });
  // Listen shutdown signals
  app.enableShutdownHooks();
  // Listen
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
