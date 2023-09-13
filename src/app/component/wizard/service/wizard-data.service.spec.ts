import { TestBed } from '@angular/core/testing';

import { WizardDataService } from './wizard-data.service';

describe('WizardDataService', () => {
  let service: WizardDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WizardDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
