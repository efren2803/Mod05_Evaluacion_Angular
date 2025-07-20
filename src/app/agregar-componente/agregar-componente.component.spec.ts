import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarComponenteComponent } from './agregar-componente.component';

describe('AgregarComponenteComponent', () => {
  let component: AgregarComponenteComponent;
  let fixture: ComponentFixture<AgregarComponenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarComponenteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgregarComponenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
