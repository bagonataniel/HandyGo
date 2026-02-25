import { ComponentFixture, TestBed } from '@angular/core/testing';
import { authServiceMock } from '../../../testing/test-setup';
import { RegisterComponent } from './register.component';
import { NavbarComponent } from '../../layout/navbar/navbar.component';


describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent, NavbarComponent],
      providers: [authServiceMock]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
