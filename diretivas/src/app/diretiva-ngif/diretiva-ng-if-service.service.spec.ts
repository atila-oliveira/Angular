import { TestBed } from '@angular/core/testing';

import { DiretivaNgIfService } from './diretiva-ng-if.service';

describe('DiretivaNgIfServiceService', () => {
  let service: DiretivaNgIfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiretivaNgIfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
