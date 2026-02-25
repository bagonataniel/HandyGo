import { TestBed } from '@angular/core/testing';
import { authServiceMock } from '../../testing/test-setup';
import { BookingService } from './booking.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('BookingService', () => {
  let service: BookingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [authServiceMock],
      imports: [ HttpClientTestingModule]

    });
    service = TestBed.inject(BookingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
