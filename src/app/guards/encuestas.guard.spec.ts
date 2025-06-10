import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { encuestasGuard } from './encuestas.guard';

describe('encuestasGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => encuestasGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
