import { TestBed } from '@angular/core/testing';

import { SqlConcatService } from './sql-concat.service';

describe('SqlConcatService', () => {
  let service: SqlConcatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SqlConcatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
