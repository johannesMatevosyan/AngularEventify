import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentTimeIndicatorComponent } from './current-time-indicator.component';

describe('CurrentTimeIndicatorComponent', () => {
  let component: CurrentTimeIndicatorComponent;
  let fixture: ComponentFixture<CurrentTimeIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentTimeIndicatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentTimeIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
