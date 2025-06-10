import { Component, OnInit } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-infoencuesta',
  templateUrl: './infoencuestas.component.html',
  styleUrls: ['./infoencuestas.component.scss'],
  imports: [CommonModule],
})
export class InfoencuestasComponent implements OnInit {
  supabase = createClient(environment.apiUrl, environment.publicAnonKey);

  encuestas: any[] = [];

  async ngOnInit() {
    await this.cargarEncuestas();
  }

  async cargarEncuestas() {
    const { data, error } = await this.supabase
      .from('encuestas')
      .select('email, nombreapellido, edad, telefono, pregunta1, pregunta2, pregunta3, created_at');

    if (error) {
      console.error('Error al traer encuestas:', error);
      return;
    }

    this.encuestas = (data ?? []).map((item: any) => ({
      ...item,
      created_at: item.created_at?.slice(0, 10)
    }));
  }

  transformarJuegos(pregunta2: string): string {
    // Convierte "op2, op3" => "Preguntados, Mayor o Menor"
    if (!pregunta2) return '';
    const juegosMap: Record<string, string> = {
      op1: 'Tetris',
      op2: 'Preguntados',
      op3: 'Mayor o Menor',
      op4: 'Ahorcado'
    };
    return pregunta2
      .split(',')
      .map(op => juegosMap[op.trim()] || op.trim())
      .join(', ');
  }
}