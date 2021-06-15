import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoetSearchComponent } from './poet-search.component';

describe('PoetSearchComponent', () => {
  let component: PoetSearchComponent;
  let fixture: ComponentFixture<PoetSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoetSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoetSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
