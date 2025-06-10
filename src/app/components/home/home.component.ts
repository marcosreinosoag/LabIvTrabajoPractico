import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { createClient } from '@supabase/supabase-js';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

const supabase = createClient(environment.apiUrl, environment.publicAnonKey);

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'] 
})
export class HomeComponent implements OnInit {
  emailUsuario: string = '';
  
   constructor(private router: Router,
    private usuarioService: UsuarioService,
    private toastr:ToastrService,
   ) {}
    ngOnInit() {
    this.emailUsuario = this.usuarioService.getEmail();
    
  }

  login() {
    this.router.navigate(['/login']);
  }
  Registrar() {
    this.router.navigate(['/register']);
  }
  AcercaDeMi() {
    this.router.navigate(['/quienSoy']);
  }
  Tetris() {
    this.router.navigate(['juegos/tetris']);
  }
  Preguntados() {
    this.router.navigate(['juegos/preguntados']);
  }
  Ahorcado() {
    this.router.navigate(['juegos/ahorcado']);
  }
  Cartas() {
    this.router.navigate(['juegos/cartas']);
  }
  Chat() {
    this.router.navigate(['/chat']);
  }
  Encuesta() {
    this.router.navigate(['/encuestas']);
  }
  Estadisticas() {
    this.router.navigate(['/puntajes']);
  }
  CerrarSesion() {
    supabase.auth.signOut().then(() => {
      this.usuarioService.setEmail('');
      this.toastr.success('Sesión cerrada correctamente', 'Éxito',{
    positionClass: 'toast-center'
  })
      this.router.navigate(['/login']);
    }).catch(error => {
      console.error('Error al cerrar sesión:', error);
    });
  }
  InfoEncuestas() {
    this.router.navigate(['/encuestas-info']);
  }

}
// export class HomeComponent implements OnInit {

//   usersdata: UserData[] = [];

//   ngOnInit(): void {
//     this.getUserData();
//   }

//   getUserData() {
//     supabase.from('users-data').select('*').then(({ data, error }) => {
//       if (error) {
//         console.error('Error:', error.message);
//       } else {
//         console.log('Data:', data);
//         this.usersdata = data;
//       }
//     }
//     );
//   }

//   getAvatarUrl(avatarUrl: string) {
//     return supabase.storage.from('images').getPublicUrl(avatarUrl).data.publicUrl;
//   }

// }
