import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PhraseDocument } from './phrase.schema';

@Injectable()
export class PhraseService {
  constructor(@InjectModel('Phrase') private readonly phraseModel: Model<PhraseDocument>) { }


  async getPhrases(): Promise<PhraseDocument[]> {
    return await this.phraseModel.find({}).exec();
  }

  async getPhraseById(id: number): Promise<PhraseDocument> {
    const phrase = await this.phraseModel.findById(id).select('-translations').exec();
    if (!phrase) {
      throw new NotFoundException('Phrase not found');
    }
    return phrase;
  }

  async getPhraseTranslation(id: number, language: string): Promise<string> {
    const query = { $and: [{ _id: id }, { [`translations.${language}`]: { $exists: true } }] };
    const phrase = await this.phraseModel.findOne(query , { [`translations.${language}`]: 1 }).exec();
    if (!phrase) {
      throw new NotFoundException('Phrase not found');
    }
    return phrase.translations.get(language)
  }

  async searchPhrases(query: string, sort?: 'asc' | 'desc', status?: string, sortBy?: string ): Promise<PhraseDocument[]> {
    const filter: any = {
      phrase: new RegExp(query, 'i')
    };
    if (status) {
      filter.status = status;
    }
    return this.phraseModel.find(filter).sort({ [sortBy]: sort === 'asc' ? 1 : -1 }).exec();
  }
}
