import { Component, OnInit, OnDestroy } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment'; 
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../services/usuario.service';
import { Router} from '@angular/router';
const supabase = createClient(environment.apiUrl, environment.publicAnonKey);

@Component({
  selector: 'app-chat',
  imports: [FormsModule,CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {
  userEmail!: string; // <- viene del home
  mensajes: any[] = [];
  nuevoMensaje: string = '';
  canal: any;
  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
   ) {}

  async ngOnInit() {
    this.userEmail = this.usuarioService.getEmail();
    // Obtener mensajes iniciales
    const { data, error } = await supabase
      .from('chat')
      .select('*')
      .order('created_at', { ascending: true });
    this.mensajes = data || [];

    // Escuchar en tiempo real
    this.canal = supabase
      .channel('chat-mensajes')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'chat' },
        (payload) => {
          this.mensajes.push(payload.new);
        }
      )
      .subscribe();
  }

  async enviarMensaje(mensaje: string) {
    if (!mensaje.trim()) return;

    await supabase.from('chat').insert([
      {
        email: this.userEmail,
        mensaje,
      },
    ]);
  }

  ngOnDestroy() {
    supabase.removeChannel(this.canal);
  }
  Home() {
    this.router.navigate(['/home']);
  }
}