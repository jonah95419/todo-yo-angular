import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PswOlvidadaComponent } from './psw-olvidada.component';

describe('PswOlvidadaComponent', () => {
  let component: PswOlvidadaComponent;
  let fixture: ComponentFixture<PswOlvidadaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PswOlvidadaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PswOlvidadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
