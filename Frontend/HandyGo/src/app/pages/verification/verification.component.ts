import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrl: './verification.component.css'
})
export class VerificationComponent {

  constructor(private auth: AuthService, private router: Router){}

  verifyAccount() {
    this.auth.setVerified(true);
    console.log(this.auth.isVerified);
  }
}
