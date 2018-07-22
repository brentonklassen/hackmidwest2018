import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTribeComponent } from './create-tribe.component';

describe('CreateTribeComponent', () => {
  let component: CreateTribeComponent;
  let fixture: ComponentFixture<CreateTribeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTribeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTribeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
