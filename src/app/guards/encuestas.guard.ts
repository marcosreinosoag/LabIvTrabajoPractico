import { CanActivateFn } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { inject } from '@angular/core';

export const encuestasGuard: CanActivateFn = (route, state) => {
  const usuarioService = inject(UsuarioService);
  const email = usuarioService.getEmail();
  const esAdmin = email === 'marcosreinoso2012@gmail.com';
  return esAdmin;
};