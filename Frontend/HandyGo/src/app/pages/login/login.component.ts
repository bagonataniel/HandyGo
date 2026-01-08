import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ConnectionService } from '../../services/connection.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  passwordVisible: boolean = false;

  constructor(private auth: AuthService, private _fb: FormBuilder, private router: Router, private connectionService: ConnectionService) {
    this.loginForm = this._fb.group({
      email: [''],
      password: ['']
    });
  }

  onLogin() {
    this.auth.login(this.loginForm.value).subscribe({
      next: (value) => {
        const res = value as any;
        console.log('Login successful', value);
        localStorage.setItem('token', res.JWT);
        localStorage.setItem('userId', res.id);
        localStorage.setItem('username', res.username);
        this.auth.setVerified(Boolean(res.is_verified));
        this.router.navigate(['/home']);
        this.connectionService.login();
        window.location.reload();
      },
      error: (err) => {
        console.error('Login failed', err.error);
      }
    });

  }
}
