import { Test, TestingModule } from '@nestjs/testing';
import { CampusController } from './campus.controller';
import { CampusService } from './campus.service';

describe('CampusController', () => {
  let campusController: CampusController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CampusController],
      providers: [CampusService],
    }).compile();

    campusController = app.get<CampusController>(CampusController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(campusController.getHello()).toBe('Hello World!');
    });
  });
});
