import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseService } from '../db/database.service';
import { RentService } from './rent.service';

describe('Module: rent.service . Class: RentService', () => {
  let rentService: RentService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        RentService,
        { provide: DatabaseService, useValue: { executeQuery: jest.fn() } },
      ],
    }).compile();

    rentService = moduleRef.get<RentService>(RentService);
  });

  describe('f: initEntity', () => {
    it('should to be defined', async () => {
      expect(await rentService.initEntity()).toBeDefined();
    });
    it('should have been called and initialize entity rent', async () => {
      const mock = jest
        .spyOn(rentService, 'initEntity')
        .mockImplementation(async () => true);
      expect(await rentService.initEntity()).toBe(true);
      expect(mock).toHaveBeenCalled();
    });
  });

  describe('f: insertInto', () => {
    it('should to be defined', async () => {
      const mock = jest
        .spyOn(rentService, 'insertInto')
        .mockImplementation(async () => []);
      expect(
        await rentService.insertInto(
          1,
          new Date('Dec 20, 2021'),
          new Date('Dec 30, 2021'),
        ),
      ).toBeDefined();
      expect(mock).toHaveBeenCalled();
    });
  });

  describe('f: deleteEntity', () => {
    it('should to be defined', async () => {
      const mock = jest
        .spyOn(rentService, 'deleteEntity')
        .mockImplementation(async () => []);
      expect(await rentService.deleteEntity()).toBeDefined();
      expect(await rentService.deleteEntity()).toStrictEqual([]);
      expect(mock).toHaveBeenCalled();
    });
  });

  describe('f: workload_query', () => {
    it('should to be defined', async () => {
      const mock = jest
        .spyOn(rentService, 'workload_query')
        .mockImplementation(async () => []);
      expect(await rentService.workload_query()).toBeDefined();
      expect(await rentService.workload_query()).toStrictEqual([]);
      expect(mock).toHaveBeenCalled();
    });
  });

  describe('f: avg_workload', () => {
    it('should to be defined', async () => {
      const mock = jest
        .spyOn(rentService, 'avg_workload')
        .mockImplementation(async () => []);
      expect(await rentService.avg_workload()).toBeDefined();
      expect(mock).toHaveBeenCalled();
      expect(await rentService.avg_workload()).toStrictEqual([]);
    });
  });

  describe('f: avg_all_workload', () => {
    it('should to be defined', async () => {
      const mock = jest
        .spyOn(rentService, 'avg_all_workload')
        .mockImplementation(async () => 1);
      expect(await rentService.avg_all_workload()).toBeDefined();
      expect(await rentService.avg_all_workload()).toBe(1);
      expect(mock).toHaveBeenCalled();
    });
  });

  describe('f: getAvailable', () => {
    it('should to be defined', async () => {
      const mock = jest
        .spyOn(rentService, 'getAvailable')
        .mockImplementation(async () => []);
      expect(await rentService.getAvailable(1)).toBeDefined();
      expect(await rentService.getAvailable(1)).toStrictEqual([]);
      expect(mock).toHaveBeenCalled();
    });
  });

  describe('f: calculateCost', () => {
    it('should to be defined', async () => {
      const mock = jest
        .spyOn(rentService, 'calculateCost')
        .mockImplementation(async () => 4950);
      expect(
        await rentService.calculateCost('2021-12-30', '2022-01-04', '2'),
      ).toBeDefined();
      expect(
        await rentService.calculateCost('2021-12-30', '2022-01-04', '2'),
      ).toBe(4950);
      expect(mock).toHaveBeenCalled();
    });
  });
});
