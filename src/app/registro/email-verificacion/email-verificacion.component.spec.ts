import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailVerificacionComponent } from './email-verificacion.component';

describe('EmailVerificacionComponent', () => {
  let component: EmailVerificacionComponent;
  let fixture: ComponentFixture<EmailVerificacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailVerificacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailVerificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
