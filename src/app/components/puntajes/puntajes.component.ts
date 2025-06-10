import { Component, OnInit } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-puntajes',
  templateUrl: './puntajes.component.html',
  styleUrls: ['./puntajes.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class PuntajesComponent implements OnInit {
  supabase = createClient(environment.apiUrl, environment.publicAnonKey);

  usuarioEmail = 'marcosreinoso2012@gmail.com'; // <-- Cambia por tu email real
  puntajesGlobal: { email: string; puntajeTotal: number }[] = [];
  puntajesIndividuales: {
    email: string;
    juego: string;
    puntaje: number;
    fecha: string;
  }[] = [];

  constructor(private router: Router) {}

  async ngOnInit() {
    await this.cargarPuntajesGlobal();
    await this.cargarPuntajesIndividuales();
  }

  async cargarPuntajesGlobal() {
    const { data, error } = await this.supabase
      .from('puntajes')
      .select('email, puntaje');

    if (error) {
      console.error('Error al obtener puntajes globales:', error);
      return;
    }
    if (!data) return;

    const acumulados = new Map<string, number>();
    data.forEach(({ email, puntaje }: any) => {
      acumulados.set(email, (acumulados.get(email) ?? 0) + puntaje);
    });

    this.puntajesGlobal = Array.from(acumulados, ([email, puntajeTotal]) => ({
      email,
      puntajeTotal,
    }));
  }

  async cargarPuntajesIndividuales() {
    const { data, error } = await this.supabase
      .from('puntajes')
      .select('email, juego, puntaje, created_at')
      .eq('email', this.usuarioEmail)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error al obtener puntajes individuales:', error);
      return;
    }

    // Mapea created_at a fecha
    this.puntajesIndividuales = (data ?? []).map((item: any) => ({
      email: item.email,
      juego: item.juego,
      puntaje: item.puntaje,
      fecha: item.created_at,
    }));
  }

  Home() {
    this.router.navigate(['/home']);
  }
}