import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm : FormGroup;
  passwordVisible: boolean = false;

  constructor(private auth:AuthService, private _fb: FormBuilder) { 
    this.loginForm = this._fb.group({
      email: [''],
      password: ['']
    });
  }


  onLogin(){
    this.auth.login(this.loginForm.value).subscribe({
      next(value) {
        console.log('Login successful', value);
        localStorage.setItem('token', JSON.parse(JSON.stringify(value)).JWT);
        localStorage.setItem('userId', JSON.parse(JSON.stringify(value)).id);
      },
      error(err) {
        console.error('Login failed', err.error);
      }
    })
  }
}
