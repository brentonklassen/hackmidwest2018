import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelCreatedComponent } from './channel-created.component';

describe('ChannelCreatedComponent', () => {
  let component: ChannelCreatedComponent;
  let fixture: ComponentFixture<ChannelCreatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChannelCreatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelCreatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
