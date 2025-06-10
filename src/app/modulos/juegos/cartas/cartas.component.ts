import { Component, OnInit } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { environment } from '../../../../environments/environment'; // Ajusta según tu estructura
import { UsuarioService } from '../../../services/usuario.service';
import { Router } from '@angular/router';

const supabase = createClient(environment.apiUrl, environment.publicAnonKey);

@Component({
  selector: 'app-cartas',
  templateUrl: './cartas.component.html',
  styleUrls: ['./cartas.component.scss'],
  standalone: false,
})
export class CartasComponent implements OnInit {
  valores = [1,2,3,4,5,6,7,8,9,10,11,12,13];
  nombres = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
  palos = ['♠', '♥', '♦', '♣'];

  cartaActual: any;
  cartaSiguiente: any;
  puntaje = 0;
  mensaje = '';
  juegoTerminado = false;

  mejoresPuntajes: any[] = [];

  constructor(private usuarioService: UsuarioService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.iniciarJuego();
  }

  iniciarJuego() {
    this.puntaje = 0;
    this.mensaje = '';
    this.juegoTerminado = false;
    this.cartaActual = this.generarCarta();
  }

  generarCarta() {
    const valor = this.valores[Math.floor(Math.random() * this.valores.length)];
    const palo = this.palos[Math.floor(Math.random() * this.palos.length)];
    return { valor, nombre: this.nombres[valor - 1], palo };
  }

  elegir(opcion: 'mayor' | 'menor') {
    if (this.juegoTerminado) return;

    this.cartaSiguiente = this.generarCarta();
    const actual = this.cartaActual.valor;
    const siguiente = this.cartaSiguiente.valor;

    const acierto =
      (opcion === 'mayor' && siguiente > actual) ||
      (opcion === 'menor' && siguiente < actual);

    if (acierto) {
      this.puntaje++;
      this.mensaje = '¡Correcto!';
      this.cartaActual = this.cartaSiguiente;
    } else {
      this.mensaje = `¡Incorrecto! Era ${this.cartaSiguiente.nombre}${this.cartaSiguiente.palo}`;
      this.juegoTerminado = true;
      this.guardarPuntaje();
     
    }
  }

  async guardarPuntaje() {
    const email = this.usuarioService.getEmail();
    if (!email) {
      console.error('No email found for user');
      return;
    }
    await supabase.from('puntajes').insert({
      email,
      puntaje: this.puntaje,
      juego: 'mayor y menor'
    });
  }

  Home() {
    this.router.navigate(['/home']);
  }
}