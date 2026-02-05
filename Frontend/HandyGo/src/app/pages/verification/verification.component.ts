import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrl: './verification.component.css'
})
export class VerificationComponent implements OnInit {
  intervalId: any;

  constructor(private auth: AuthService, private router: Router){}

  verifyAccount() {
    this.auth.setVerified(true);
    console.log(this.auth.isVerified);
  }

  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      this.auth.checkVerificationStatus().subscribe({
        next: (response: any) => {
          if (response.is_verified == 1) {
            this.auth.setVerified(true);
            clearInterval(this.intervalId);
            this.router.navigate(['/home']);
          }
        },
        error: (error) => {
          console.error('Error checking verification status', error);
        }});
  }, 10000);
  }

  resendVerificationEmail(){
    this.auth.resendVerificationEmail().subscribe({
      next: (response) => {
        console.log('Verification email resent successfully', response);
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('Error resending verification email', error);
      }
    });
  }
}
