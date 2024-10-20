import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { PhraseService } from 'src/phrases/phrase.service';

describe('PhraseService', () => {
  let service: PhraseService;

  const mockPhraseModel = {
    findById: jest.fn().mockImplementation((id) => ({
      select: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue({ id, phrase: 'Test phrase' })
    })),
    find: jest.fn().mockReturnValue({
      sort: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue([])
    })
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PhraseService,
        { provide: getModelToken('Phrase'), useValue: mockPhraseModel }
      ]
    }).compile();

    service = module.get<PhraseService>(PhraseService);
  });

  it('should return a phrase by ID', async () => {
    const phrase = await service.getPhraseById(1);
    expect(phrase.phrase).toEqual('Test phrase');
  });

  // it('should search for phrases', async () => {
  //   const result = await service.searchPhrases('test');
  //   expect(result).toEqual([]);
  // });
});
