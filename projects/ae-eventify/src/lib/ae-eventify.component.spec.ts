import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AeEventifyComponent } from './ae-eventify.component';

describe('AeEventifyComponent', () => {
  let component: AeEventifyComponent;
  let fixture: ComponentFixture<AeEventifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AeEventifyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AeEventifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
