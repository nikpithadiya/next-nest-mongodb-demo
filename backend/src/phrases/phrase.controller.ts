import { Controller, Get, Param, Query } from '@nestjs/common';
import { PhraseService } from './phrase.service';


@Controller('phrases')
export class PhraseController {
  constructor(private readonly phraseService: PhraseService) {}

  @Get('/') 
  async getPhrases(){
    return this.phraseService.getPhrases();
  }

  @Get('search')
  async searchPhrases(@Query('query') query: string, @Query('sort') sort?: 'asc' | 'desc',  @Query('sortBy') sortBy?: string,@Query('status') status?: string) {
    return this.phraseService.searchPhrases(query, sort, status,sortBy);
  }

  @Get(':id')
  async getPhraseById(@Param('id') id: number) {
    return this.phraseService.getPhraseById(id);
  }

  @Get(':id/:language')
  async getPhraseTranslation(@Param('id') id: number, @Param('language') language: string) {
    return this.phraseService.getPhraseTranslation(id, language);
  }
  
}
