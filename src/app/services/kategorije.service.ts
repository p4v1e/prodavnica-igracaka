import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';
import { Kategorija } from '../models';
import { KATEGORIJE } from './testni-podaci';

// Simulirano kasnjenje odgovora servera
export const KASNJENJE = 200;

// Servis za rad sa kategorijama
@Injectable({ providedIn: 'root' })
export class KategorijeService {
  private kategorije: Kategorija[] = KATEGORIJE;

  sve(): Observable<Kategorija[]> {
    return of(this.kategorije).pipe(delay(KASNJENJE));
  }

  sveSinhrono(): Kategorija[] {
    return this.kategorije;
  }

  naziv(id: number): string {
    const k = this.kategorije.find(x => x.id === id);
    return k ? k.naziv : '-';
  }
}
