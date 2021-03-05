import { TestBed } from '@angular/core/testing';

import { GenerBooksService } from './gener-books.service';

describe('GenerBooksService', () => {
  let service: GenerBooksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenerBooksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
