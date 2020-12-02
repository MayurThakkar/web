import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeterlistComponent } from './meterlist.component';

describe('MeterlistComponent', () => {
  let component: MeterlistComponent;
  let fixture: ComponentFixture<MeterlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeterlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeterlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
