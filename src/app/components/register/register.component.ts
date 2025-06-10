import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { createClient, User } from '@supabase/supabase-js'
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';



const supabase = createClient(environment.apiUrl, environment.publicAnonKey)

@Component({
  standalone: true,
  imports: [FormsModule, RouterLink,CommonModule,MatSnackBarModule],
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
username: string;
password: string;
errorMessage: string = '';
errorMessages: { [key: string]: string } = {
  'User already registered': 'El usuario ya está registrado',
  'Unable to validate email address: invalid format': 'El formato del correo es inválido',
  'Password should be at least 6 characters.': 'La contraseña debe tener al menos 6 caracteres',
  'Anonymous sign-ins are disabled': 'Debe ingresar un correo electrónico',
  'Signup requires a valid password': 'Debe ingresar una contraseña',
};


constructor(private snackBar: MatSnackBar,private router: Router) {
  this.username = '';
  this.password = '';
}


register() {
  supabase.auth.signUp({
    email: this.username,
    password: this.password,
  }).then(({ data, error }) => {
    if (error) {
      this.errorMessage = this.errorMessages[error.message] || error.message;      
      console.log('Error:', error.message);
      return;
      
    } else {
      console.log('User registered:', data.user);
      this.snackBar.open('Usuario registrado con éxito', 'Cerrar', {
        duration: 3000,
        panelClass: ['success-snackbar'],
      });
      this.router.navigate(['/home']);
    }
  }
  );

}
}
