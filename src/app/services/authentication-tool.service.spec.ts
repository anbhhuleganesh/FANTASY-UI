import { TestBed } from '@angular/core/testing';

import { AuthenticationToolService } from './authentication-tool.service';

describe('AuthenticationToolService', () => {
  let service: AuthenticationToolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthenticationToolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
