import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AeHeaderComponent } from './ae-header.component';

describe('AeHeaderComponent', () => {
  let component: AeHeaderComponent;
  let fixture: ComponentFixture<AeHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AeHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AeHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
