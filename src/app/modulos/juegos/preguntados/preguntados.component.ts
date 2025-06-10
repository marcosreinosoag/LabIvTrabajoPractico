import { Component, OnInit } from '@angular/core';
import { SimpsonsService, SimpsonCharacter } from '../../../services/simpsons.service'; // Importa el servicio y la interfaz

@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.scss'],
  standalone: false,
})
export class PreguntadosComponent implements OnInit {
  personajeActual: SimpsonCharacter | null = null;
  opciones: string[] = [];
  respuesta: string = '';
  puntaje: number = 0;
  juegoTerminado: boolean = false;

  constructor(private simpsonsService: SimpsonsService) {}

  ngOnInit() {
    this.nuevaPregunta();
  }

  async nuevaPregunta() {
    this.respuesta = '';
    this.juegoTerminado = false;

    // Usa el servicio para obtener personajes únicos
    const personajes = await this.simpsonsService.getUniqueRandomCharacters(3);

    this.personajeActual = personajes[0];
    this.opciones = personajes.map(p => p.character).sort(() => Math.random() - 0.5);
  }

  elegir(opcion: string) {
    if (!this.personajeActual) return;
    if (opcion === this.personajeActual.character) {
      this.respuesta = '¡Correcto!';
      this.puntaje++;
    } else {
      this.respuesta = `Incorrecto. Era: ${this.personajeActual.character}`;
      this.juegoTerminado = true;
    }
  }

  reiniciar() {
    this.puntaje = 0;
    this.nuevaPregunta();
  }
}