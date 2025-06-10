import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TetrisComponent } from './tetris/tetris.component';
import { PreguntadosComponent } from './preguntados/preguntados.component';
import { AhorcadoComponent } from './ahorcado/ahorcado.component';
import { CartasComponent } from './cartas/cartas.component';

const routes: Routes = [
  {path: 'tetris',  component: TetrisComponent,},
  {path: 'preguntados',  component: PreguntadosComponent,},
  {path: 'ahorcado',  component: AhorcadoComponent,},
  {path: 'cartas',  component: CartasComponent,},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JuegosRoutingModule { }
