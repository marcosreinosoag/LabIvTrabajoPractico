import { Injectable } from '@angular/core';

// @Injectable({ providedIn: 'root' })
// export class UsuarioService {
//   private email: string = '';

//   setEmail(email: string) {
//     this.email = email;
//   }

//   getEmail(): string {
//     return this.email;
//   }
// }
@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private email: string = '';

  setEmail(email: string) {
    this.email = email;
    localStorage.setItem('email', email); // ✅ guardar
  }

  getEmail(): string {
    if (!this.email) {
      this.email = localStorage.getItem('email') ?? '';
    }
    return this.email;
  }

  clearEmail() {
    this.email = '';
    localStorage.removeItem('email');
  }
}