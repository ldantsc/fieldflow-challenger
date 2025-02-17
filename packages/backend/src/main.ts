import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
import * as process from 'process';

const httpsOptions = {
  key: fs.readFileSync('pem/privkey.pem'),
  cert: fs.readFileSync('pem/fullchain.pem'),
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { httpsOptions, cors: true });
  await app.listen(process.env.PORT);
}
bootstrap();
