import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validator, AbstractControl, Validators } from '@angular/forms';
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
      name: ['', [
        Validators.required,
        Validators.minLength(5)
      ]],
      email: ['',[
        Validators.required,
        Validators.email
      ]],
      password: ['',[
        Validators.required,
        Validators.minLength(8),
        this.passwordStrengthValidator
      ]]
    });
  }

  passwordStrengthValidator(control:AbstractControl){
    const value = control.value;

    if(!value) return null;

    const hasUpperCase = /[A-Z]+/.test(value);
    const hasLowerCase = /[a-z]+/.test(value);
    const hasNumeric = /[0-9]+/.test(value);
    
    const valid = hasLowerCase && hasNumeric && hasUpperCase;

    return !valid ? { passwordStrength: 'A jelszónak legalább 8 karakter hosszúnak kell lennie, és tartalmaznia kell kis- és nagybetűt, valamint számot.' } : null;

  }

  onRegister() {
    if (this.confirmPassword !== this.registerForm.value.password) {
      this._snackBar.open('A jelszavak nem egyeznek meg', 'Bezár', { duration: 3000 });
      return;
    }
    if (this.registerForm.get('password')?.errors?.['passwordStrength']){
      this._snackBar.open(this.registerForm.get('password')?.errors?.['passwordStrength'], 'Bezár', { duration: 3000 });
      return;
    }
    if (this.registerForm.invalid) {
      this._snackBar.open('Kérem töltse ki a mezőket helyesen', 'Bezár', { duration: 3000 });
      return;
    }
    
    this.auth.register(this.registerForm.value).subscribe({
      next: (value) => {
        console.log('Registration successful', value);
        this._snackBar.open("✅ Regisztráció sikeres! Kattints az e-mailben lévő linkre a fiók aktiválásához. 📧", 'Bezár', { duration: 3000 });
      },
      error: (err) => {
        console.error('Login failed', err);
        this._snackBar.open(`❌ Hiba a regisztráció során`, 'Bezár', { duration: 3000 });
      }
    })
  }
}
