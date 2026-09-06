import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, delay, of } from 'rxjs';
import { FilterIgracaka, Igracka } from '../models/igracka.model';
import { IGRACKE } from './testni-podaci';
import { KASNJENJE } from './kategorije.service';

// Servis koji simulira rad sa bazom igracaka.
// Podaci se cuvaju u nizu i menjaju u toku sesije.
@Injectable({ providedIn: 'root' })
export class IgrackeService {
  private igracke: Igracka[] = IGRACKE.map(i => ({ ...i }));
  private izvor = new BehaviorSubject<Igracka[]>(this.igracke);

  igracke$ = this.izvor.asObservable();

  // ---- citanje ----

  sve(): Observable<Igracka[]> {
    return of(this.igracke).pipe(delay(KASNJENJE));
  }

  sveSinhrono(): Igracka[] {
    return this.igracke;
  }

  jedna(id: number): Observable<Igracka | undefined> {
    return of(this.igracke.find(i => i.id === id)).pipe(delay(KASNJENJE));
  }

  izdvojene(): Observable<Igracka[]> {
    return of(this.igracke.filter(i => i.izdvojeno)).pipe(delay(KASNJENJE));
  }

  // ---- pretraga ----

  pretrazi(filter: FilterIgracaka): Observable<Igracka[]> {
    const pojam = filter.pojam.trim().toLowerCase();
    let rezultat = this.igracke.filter(i => {
      if (pojam && !(i.naziv + ' ' + i.proizvodjac + ' ' + i.sifra).toLowerCase().includes(pojam)) {
        return false;
      }
      if (filter.kategorijaId !== null && i.kategorijaId !== filter.kategorijaId) { return false; }
      if (filter.uzrast !== '' && i.uzrast !== filter.uzrast) { return false; }
      if (filter.minCena !== null && i.cena < filter.minCena) { return false; }
      if (filter.maxCena !== null && i.cena > filter.maxCena) { return false; }
      return true;
    });

    if (filter.sortiranje === 'cena-rastuce') {
      rezultat = rezultat.sort((a, b) => a.cena - b.cena);
    } else if (filter.sortiranje === 'cena-opadajuce') {
      rezultat = rezultat.sort((a, b) => b.cena - a.cena);
    } else {
      rezultat = rezultat.sort((a, b) => a.naziv.localeCompare(b.naziv));
    }

    return of(rezultat).pipe(delay(KASNJENJE));
  }

  // ---- upis, izmena, brisanje ----

  dodaj(nova: Igracka): Observable<Igracka> {
    nova.id = this.sledeciId();
    nova.sifra = 'IGR-' + String(nova.id).padStart(3, '0');
    this.igracke = [...this.igracke, nova];
    this.izvor.next(this.igracke);
    return of(nova).pipe(delay(KASNJENJE));
  }

  izmeni(izmenjena: Igracka): Observable<Igracka> {
    this.igracke = this.igracke.map(i => i.id === izmenjena.id ? izmenjena : i);
    this.izvor.next(this.igracke);
    return of(izmenjena).pipe(delay(KASNJENJE));
  }

  obrisi(id: number): Observable<boolean> {
    this.igracke = this.igracke.filter(i => i.id !== id);
    this.izvor.next(this.igracke);
    return of(true).pipe(delay(KASNJENJE));
  }

  // Umanjuje zalihe posle kupovine
  umanjiZalihe(naziv: string, kolicina: number): void {
    this.igracke = this.igracke.map(i =>
      i.naziv === naziv ? { ...i, naStanju: Math.max(0, i.naStanju - kolicina) } : i
    );
    this.izvor.next(this.igracke);
  }

  private sledeciId(): number {
    let max = 0;
    for (const i of this.igracke) {
      if (i.id > max) { max = i.id; }
    }
    return max + 1;
  }
}
