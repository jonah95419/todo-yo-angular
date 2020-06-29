import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CotizacionDetallesComponent } from './cotizacion-detalles.component';

describe('CotizacionDetallesComponent', () => {
  let component: CotizacionDetallesComponent;
  let fixture: ComponentFixture<CotizacionDetallesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CotizacionDetallesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CotizacionDetallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
