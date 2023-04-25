import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('MatCafe')
    .setDescription('Campus de aprendizaje')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [
        'amqps://kcbgbwco:J0FHFTAYqWX8WgpOX4F6I0Z0Ry09IH1B@porpoise.rmq.cloudamqp.com/kcbgbwco',
      ],
      queue: 'campus',
      queueOptions: {
        durable: false,
      },
    },
  });

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors();

  await app.startAllMicroservices();

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
