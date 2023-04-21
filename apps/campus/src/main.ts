import { NestFactory } from '@nestjs/core';
import { CampusModule } from './campus.module';

async function bootstrap() {
  const app = await NestFactory.create(CampusModule);
  await app.listen(3000);
}
bootstrap();
