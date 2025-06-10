import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { createClient } from '@supabase/supabase-js'
import { environment } from '../../../environments/environment'; 
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from '../../services/usuario.service';

const supabase = createClient(environment.apiUrl, environment.publicAnonKey)

@Component({
  standalone: true,
  imports: [FormsModule,CommonModule, RouterLink],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  errorMessage="";
  username: string = "";
  password: string = "";

  constructor(private router: Router,
    private toastr:ToastrService,
   private usuarioService: UsuarioService,) {}

  UsuarioUno(){
    this.username = "marcosreinoso2012@gmail.com";
    this.password = "12345678";
  }
  UsuarioDos(){
    this.username = "marcosreinoso2014@gmail.com";
    this.password = "12345678";
  }

login() {
  supabase.auth.signInWithPassword({
    email: this.username,
    password: this.password,
  }).then(({ data, error }) => {
    if (error) {
      this.errorMessage = "Credenciales incorrectas";
      console.error('Error:', error.message);
      
    } else {
       this.usuarioService.setEmail(this.username); 
      this.router.navigate(['/home']).then(() => {
        this.toastr.success('Sesión ingresada correctamente', 'Éxito',{
  positionClass: 'toast-center'
});
      });
    }
  });
}
}
