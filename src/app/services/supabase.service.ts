import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      'https://qnmlmyknlecqaipzjjpe.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFubWxteWtubGVjcWFpcHpqanBlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQxNTU0ODQsImV4cCI6MjA1OTczMTQ4NH0.KjiAgK9tsRQKumzTRzvw9bRqAKnH5oJM0rlb7t2h-yM'
    );
  }

  async saveGameScore(email: string, juego: string, puntaje: number): Promise<void> {
    const { error } = await this.supabase
      .from('puntajes')
      .insert([{ email, juego, puntaje }]);

    if (error) {
      console.error('Error al guardar puntaje en Supabase:', error);
    } else {
      console.log('Puntaje guardado correctamente');
    }
  }
}