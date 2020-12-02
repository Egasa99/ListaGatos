import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GatoDetallePage } from './gato-detalle.page';

describe('GatoDetallePage', () => {
  let component: GatoDetallePage;
  let fixture: ComponentFixture<GatoDetallePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GatoDetallePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GatoDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
