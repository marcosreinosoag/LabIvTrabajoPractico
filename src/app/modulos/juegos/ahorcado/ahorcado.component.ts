import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UsuarioService } from '../../../services/usuario.service';
import { Router} from '@angular/router';
import { createClient } from '@supabase/supabase-js';
import { environment } from '../../../../environments/environment';
const supabase = createClient(environment.apiUrl, environment.publicAnonKey);

@Component({
  selector: 'app-ahorcado',
  standalone: false,
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.scss']
  
})
export class AhorcadoComponent implements OnInit {
  
  palabras = ['ANGULAR', 'IONIC', 'TYPESCRIPT', 'AHORCADO', 'SERVICIOS'];
  palabra = '';
  palabraOculta = '';
  intentos = 6;
  letrasUsadas: string[] = [];
  puntaje = 0;
  juegoTerminado = false;
  mensajeFinal = '';
    constructor(
    private router: Router,
    private usuarioService: UsuarioService,
   ) {}
   
  ngOnInit() {
    this.nuevaPalabra();
  }

  nuevaPalabra() {
    this.intentos = 6;
    this.letrasUsadas = [];
    this.juegoTerminado = false;
    this.mensajeFinal = '';
    this.palabra = this.palabras[Math.floor(Math.random() * this.palabras.length)];
    this.palabraOculta = '_ '.repeat(this.palabra.length);
  }
  Home() {
    this.router.navigate(['/home']);
  }

  probarLetra(letra: string) {
    if (this.juegoTerminado || this.letrasUsadas.includes(letra)) return;

    this.letrasUsadas.push(letra);
    if (this.palabra.includes(letra)) {
      let nuevaOculta = '';
      for (let i = 0; i < this.palabra.length; i++) {
        nuevaOculta += this.palabra[i] === letra ? letra + ' ' : this.palabraOculta[i * 2] + ' ';
      }
      this.palabraOculta = nuevaOculta;

      if (!this.palabraOculta.includes('_')) {
        this.juegoTerminado = true;
        this.puntaje += 10;
        this.mensajeFinal = '¡Ganaste!';
         this.guardarPuntaje();
      }
    } else {
      this.intentos--;
      if (this.intentos === 0) {
        this.juegoTerminado = true;
        this.mensajeFinal = `Perdiste. Era: ${this.palabra}`;
        this.guardarPuntaje();
      }
    }
  }
  async guardarPuntaje() {
  const email = this.usuarioService.getEmail();
  if (!email) {
    console.warn('No hay email disponible. No se guardó el puntaje.');
    return;
  }

  const { error } = await supabase.from('puntajes').insert({
    email,
    puntaje: this.puntaje,
    juego: 'Ahorcado'
  });

  if (error) {
    console.error('Error al guardar puntaje en Supabase:', error.message);
  }
}
}