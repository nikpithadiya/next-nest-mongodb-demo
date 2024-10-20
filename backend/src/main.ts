import { NestFactory } from '@nestjs/core';
import { PhraseModule } from './phrases/phrase.module';

async function bootstrap() {
  console.log('Starting application bootstrap...');
  const app = await NestFactory.create(PhraseModule, { logger: ['log', 'error', 'warn', 'debug'] });
  console.log('Nest application created...');
  app.enableCors({
    origin: ['http://localhost:3000'], 
    methods: 'GET,POST,PUT,DELETE',    
    credentials: true,                 
  });
  
  await app.listen(process.env.PORT ?? 8000).then(() => {
    console.log("Application started on : " ,process.env.PORT)
  }).catch(error => {
    console.error("Error when starting an app : ",error)
  }) 
}
bootstrap();
