import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerComponent } from './gener.component';

describe('GenerComponent', () => {
  let component: GenerComponent;
  let fixture: ComponentFixture<GenerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
