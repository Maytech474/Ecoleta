import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Rodape2Component } from './rodape2.component';

describe('Rodape2Component', () => {
  let component: Rodape2Component;
  let fixture: ComponentFixture<Rodape2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Rodape2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Rodape2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
