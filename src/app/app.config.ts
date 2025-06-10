import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { provideHttpClient } from '@angular/common/http'; // <- esto es obligatorio para hacer peticiones HTTP


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    provideHttpClient(),  // <- esto es obligatorio para hacer peticiones HTTP
  importProvidersFrom(BrowserAnimationsModule),  // <- esto es obligatorio para animaciones
  provideToastr()                                 // <- esto registra el servicio toastr  
  ]
};
