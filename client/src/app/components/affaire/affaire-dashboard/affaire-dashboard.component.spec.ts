import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffaireDashboardComponent } from './affaire-dashboard.component';

describe('AffaireDashboardComponent', () => {
  let component: AffaireDashboardComponent;
  let fixture: ComponentFixture<AffaireDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AffaireDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffaireDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
