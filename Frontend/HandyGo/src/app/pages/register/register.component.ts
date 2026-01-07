import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private _snackBar = inject(MatSnackBar);
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
      next: (value) => {
        console.log('Registration successful', value);
        this._snackBar.open("✅ Regisztráció sikeres! Kattints az e-mailben lévő linkre a fiók aktiválásához. 📧", 'Close', { duration: 3000 });
      },
      error: (err) => {
        console.error('Login failed', err.error);
        this._snackBar.open(`❌ Hiba a regisztráció során: ${err.error.error}`, 'Close', { duration: 3000 });
      }
    })
  }
}
