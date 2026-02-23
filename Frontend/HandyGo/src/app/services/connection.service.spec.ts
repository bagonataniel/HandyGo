import { TestBed } from '@angular/core/testing';
import { authServiceMock } from '../../testing/test-setup';
import { ConnectionService } from './connection.service';

describe('ConnectionService', () => {
  let service: ConnectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [authServiceMock]
    });
    service = TestBed.inject(ConnectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
