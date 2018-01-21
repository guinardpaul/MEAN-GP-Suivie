import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffaireNavbarComponent } from './affaire-navbar.component';

describe('AffaireNavbarComponent', () => {
  let component: AffaireNavbarComponent;
  let fixture: ComponentFixture<AffaireNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AffaireNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffaireNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
