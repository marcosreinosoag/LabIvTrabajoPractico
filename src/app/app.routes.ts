import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';
import { QuienSoyComponent } from './components/quien-soy/quien-soy.component';

import { EncuestaComponent } from './components/encuesta/encuesta.component';
import { PuntajesComponent } from './components/puntajes/puntajes.component';
import { ChatComponent } from './components/chat/chat.component';
import { InfoencuestasComponent } from './components/infoencuestas/infoencuestas.component';
import { encuestasGuard } from './guards/encuestas.guard';


export const routes: Routes = [
    {path: '',redirectTo: 'home', pathMatch:"full"},
    {path: 'home',component: HomeComponent,},
    {path: 'juegos',loadChildren: () => import('./modulos/juegos/juegos.module').then(m => m.JuegosModule)},
    {path: 'login',component: LoginComponent,},
    {path: 'quienSoy',component: QuienSoyComponent,},
    {path: 'register', component: RegisterComponent },
    {path: 'encuestas-info',component: InfoencuestasComponent,canActivate: [encuestasGuard]},

    // {path: 'chat', component: ChatComponent },
    {path: 'chat', component: ChatComponent},
    {path: 'puntajes', component: PuntajesComponent},
    {path: 'encuestas', component: EncuestaComponent },
    {path: '**',component:PageNotFoundComponent},
];