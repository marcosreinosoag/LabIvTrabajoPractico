import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface SimpsonCharacter {
  character: string;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class SimpsonsService {
  private apiUrl = 'https://thesimpsonsquoteapi.glitch.me/characters';

  constructor(private http: HttpClient) {}

  /** Trae un personaje aleatorio */
  getRandomCharacter(): Observable<SimpsonCharacter> {
    return this.http.get<any>(this.apiUrl).pipe(
      // La API retorna un array con un objeto adentro
      // Ej: [ { character, image, ... } ]
      // Por eso devolvemos solo el primero
      map(result => ({
        character: result[0].character,
        image: result[0].image
      }))
    );
  }

  /** Trae N personajes aleatorios distintos */
  getUniqueRandomCharacters(n: number): Promise<SimpsonCharacter[]> {
    const characters = new Set<string>();
    const results: SimpsonCharacter[] = [];
    return new Promise(async (resolve) => {
      while (results.length < n) {
       const char = await this.getRandomCharacter().toPromise();
    if (char && !characters.has(char.character)) {
    characters.add(char.character);
    results.push(char);
    }
      }
      resolve(results);
    });
  }
}