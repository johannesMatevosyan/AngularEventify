import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularEventifyComponent } from './angular-eventify.component';

describe('AngularEventifyComponent', () => {
  let component: AngularEventifyComponent;
  let fixture: ComponentFixture<AngularEventifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AngularEventifyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AngularEventifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
