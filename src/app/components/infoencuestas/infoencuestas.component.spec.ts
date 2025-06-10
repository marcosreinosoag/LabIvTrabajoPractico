import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoencuestasComponent } from './infoencuestas.component';

describe('InfoencuestasComponent', () => {
  let component: InfoencuestasComponent;
  let fixture: ComponentFixture<InfoencuestasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoencuestasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoencuestasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
