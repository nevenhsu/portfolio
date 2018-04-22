import { TestBed, inject } from '@angular/core/testing';

import { WorkDataService } from './work-data.service';

describe('WorkDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorkDataService]
    });
  });

  it('should be created', inject([WorkDataService], (service: WorkDataService) => {
    expect(service).toBeTruthy();
  }));
});
