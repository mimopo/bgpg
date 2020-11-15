import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { join } from 'path';

import { serveStaticFiles } from './serve-static-files';

// Nest bootstrap
async function bootstrap() {
  // Create Nest App
  const app = await NestFactory.create(AppModule);
  // Serve static files
  if (process.env.BGPG_SERVE_STATIC_FILES) {
    serveStaticFiles(app, '/static', process.env.BGPG_SERVE_STATIC_FILES);
  }
  if (process.env.BGPG_SERVE_FRONTEND) {
    serveStaticFiles(app, '/', process.env.BGPG_SERVE_FRONTEND);
    serveStaticFiles(app, '*', join(process.env.BGPG_SERVE_FRONTEND, 'index.html'));
  }
  // Listen shutdown signals
  app.enableShutdownHooks();
  // Listen
  await app.listen(process.env.BGPG_PORT || 3000);
}
bootstrap();
