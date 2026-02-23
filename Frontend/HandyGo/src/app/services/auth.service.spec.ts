import { TestBed } from '@angular/core/testing';
import { authServiceMock } from '../../testing/test-setup';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [authServiceMock],

    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return false for isLoggedIn by default', () => {
    localStorage.removeItem('token');
    expect(service.loggedIn()).toBeFalse();
  });

  it('should return true if token is set', () =>{
    localStorage.setItem('token','test');
    expect(service.loggedIn()).toBeTrue();
  });
});
