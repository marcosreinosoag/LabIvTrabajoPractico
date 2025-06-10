import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { createClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

const supabase = createClient(environment.apiUrl, environment.publicAnonKey);

@Component({
  selector: 'app-encuesta',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.scss']
})
export class EncuestaComponent implements OnInit {
  form!: FormGroup;

  constructor(private fb: FormBuilder, 
     private usuarioService: UsuarioService,
    private router:Router) {}

  ngOnInit() {
    
    this.form = this.fb.group({
      nombreApellido: ['', Validators.required],
      edad: ['', [Validators.required, Validators.min(18), Validators.max(99)]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{1,10}$')]],
      pregunta1: ['', Validators.required],
      pregunta2: this.fb.group({
        op1: [false],
        op2: [false],
        op3: [false],
      }),
      pregunta3: ['', Validators.required],
    });
  }

  async enviarEncuesta() {
    if (this.form.invalid) return;

    const userResponse = await supabase.auth.getUser();
    const email = this.usuarioService.getEmail();

    const respuestas = this.form.value;
    const opcionesSeleccionadas = Object.entries(respuestas.pregunta2)
      .filter(([_, v]) => v)
      .map(([k]) => k)
      .join(', ');

    const data = {
      email,
      nombreapellido: respuestas.nombreApellido,
      edad: respuestas.edad,
      telefono: respuestas.telefono,
      pregunta1: respuestas.pregunta1,
      pregunta2: opcionesSeleccionadas,
      pregunta3: respuestas.pregunta3,
    };

    const { error } = await supabase.from('encuestas').insert([data]);

    if (error) {
      console.error('Error al guardar encuesta:', error.message);
      alert('Error al enviar la encuesta.');
    } else {
      alert('¡Encuesta enviada con éxito!');
      this.form.reset();
    }
  }
   Home() {
    this.router.navigate(['/home']);
  }
}