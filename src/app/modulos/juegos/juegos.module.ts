import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JuegosRoutingModule } from './juegos-routing.module';
import { TetrisComponent } from './tetris/tetris.component';
import { PreguntadosComponent } from './preguntados/preguntados.component';
import { CartasComponent } from './cartas/cartas.component';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { AhorcadoComponent } from './ahorcado/ahorcado.component';



@NgModule({
  declarations: [PreguntadosComponent,TetrisComponent,CartasComponent,AhorcadoComponent],
  imports: [
    CommonModule,
    JuegosRoutingModule,
    IonicModule,
    HttpClientModule,
  ]
})
export class JuegosModule { }
