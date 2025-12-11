import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  passwordVisible: boolean = false;
  confirmPassword: string = '';

  constructor(private auth: AuthService, private _fb: FormBuilder) {
    this.registerForm = this._fb.group({
      name: [''],
      email: [''],
      password: ['']
    });
  }


  onRegister() {
    if (this.confirmPassword !== this.registerForm.value.password) {
      console.log('Passwords do not match');
      return;
    }
    
    this.auth.register(this.registerForm.value).subscribe({
      next(value) {
        console.log('Registration successful', value);
        localStorage.setItem('token', JSON.parse(JSON.stringify(value)).JWT);
        localStorage.setItem('userId', JSON.parse(JSON.stringify(value)).id);
      },
      error(err) {
        console.error('Login failed', err.error);
      }
    })
  }
}
