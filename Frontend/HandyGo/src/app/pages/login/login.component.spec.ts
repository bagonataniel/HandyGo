import { ComponentFixture, TestBed } from '@angular/core/testing';
import { authServiceMock } from '../../../testing/test-setup';
import { LoginComponent } from './login.component';
import { NavbarComponent } from '../../layout/navbar/navbar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent, NavbarComponent],
      providers: [
        authServiceMock,
        MatFormFieldModule,
        MatIconModule,
        FormsModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
