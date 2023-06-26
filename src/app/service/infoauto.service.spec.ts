import { TestBed } from '@angular/core/testing';

import { InfoautoService } from './infoauto.service';

describe('InfoautoService', () => {
  let service: InfoautoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfoautoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
