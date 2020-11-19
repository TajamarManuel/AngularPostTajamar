import { TestBed } from '@angular/core/testing';

import { HistoricosService } from './historicos-service.service';

describe('HistoricosServiceService', () => {
  let service: HistoricosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoricosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
