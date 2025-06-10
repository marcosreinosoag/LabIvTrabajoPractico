import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://<tu-proyecto>.supabase.co';
const supabaseKey = '<tu-clave-anon>';

const supabase = createClient(supabaseUrl, supabaseKey);

@Injectable({ providedIn: 'root' })
export class ChatService {
  mensajes: any[] = [];

  constructor() {
    this.escucharMensajes();
  }

  async enviarMensaje(email: string, contenido: string) {
    await supabase.from('mensajes').insert([{ email, contenido }]);
  }

  async obtenerMensajes() {
    const { data } = await supabase.from('mensajes').select('*').order('fecha', { ascending: true });
    this.mensajes = data || [];
    return this.mensajes;
  }

  escucharMensajes(callback?: (msg: any) => void) {
    supabase
      .channel('mensajes')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'mensajes' }, payload => {
        this.mensajes.push(payload.new);
        if (callback) callback(payload.new);
      })
      .subscribe();
  }
}