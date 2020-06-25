import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbanieleriaCotizacionComponent } from './albanieleria-cotizacion.component';

describe('AlbanieleriaCotizacionComponent', () => {
  let component: AlbanieleriaCotizacionComponent;
  let fixture: ComponentFixture<AlbanieleriaCotizacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlbanieleriaCotizacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbanieleriaCotizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
