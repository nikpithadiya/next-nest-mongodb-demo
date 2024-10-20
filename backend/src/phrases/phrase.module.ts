import { Module } from '@nestjs/common';
import { PhraseService } from './phrase.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PhraseController } from './phrase.controller';
import { PhraseSchema } from './phrase.schema';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
    }),
    MongooseModule.forRoot(process.env.DATABASE_URL ?? "mongodb://localhost:27017/assignment-1") ,
    MongooseModule.forFeature([{ name: 'Phrase', schema: PhraseSchema }])],
  controllers: [PhraseController],
  providers: [PhraseService],
})
export class PhraseModule {}
