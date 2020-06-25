import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbanieleriaComponent } from './albanieleria.component';

describe('AlbanieleriaComponent', () => {
  let component: AlbanieleriaComponent;
  let fixture: ComponentFixture<AlbanieleriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlbanieleriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbanieleriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
