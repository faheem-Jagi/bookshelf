import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerBooksComponent } from './gener-books.component';

describe('GenerBooksComponent', () => {
  let component: GenerBooksComponent;
  let fixture: ComponentFixture<GenerBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerBooksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
