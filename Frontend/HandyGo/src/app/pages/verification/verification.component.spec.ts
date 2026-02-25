import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { VerificationComponent } from './verification.component';
import { AuthService } from '../../services/auth.service';
import {of} from 'rxjs';


describe('VerificationComponent', () => {
  let component: VerificationComponent;
  let fixture: ComponentFixture<VerificationComponent>;

  beforeEach(async () => {
    const authMock = {
      isLoggedIn: jasmine.createSpy().and.returnValue(of(true))
    };

    await TestBed.configureTestingModule({
      declarations: [VerificationComponent],
      imports: [HttpClientTestingModule],
      providers: [
        {provide:AuthService, useValue: authMock}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
