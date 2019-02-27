import { TestBed } from '@angular/core/testing';

import { JsonHttpService } from './json-http.service';

describe('JsonHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JsonHttpService = TestBed.get(JsonHttpService);
    expect(service).toBeTruthy();
  });
});
