import { TestBed } from '@angular/core/testing';
import { authServiceMock } from '../../testing/test-setup';
import { UsersService } from './users.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [authServiceMock],
      imports: [ HttpClientTestingModule]
    });
    service = TestBed.inject(UsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
