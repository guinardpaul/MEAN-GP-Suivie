import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionMoeComponent } from './gestion-moe.component';

describe('GestionMoeComponent', () => {
  let component: GestionMoeComponent;
  let fixture: ComponentFixture<GestionMoeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionMoeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionMoeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
