import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log(`Server is running in port ${process.env.PORT}`);
  app.enableCors({
    origin: 'http://localhost:3000/',
    methods: ['GET', 'POST'],
  });
  await app.listen(process.env.PORT || 8084);
}
bootstrap();
