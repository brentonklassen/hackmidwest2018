import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EndTribeComponent } from './end-tribe.component';

describe('EndTribeComponent', () => {
  let component: EndTribeComponent;
  let fixture: ComponentFixture<EndTribeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EndTribeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EndTribeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
