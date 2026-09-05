import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, delay, of } from 'rxjs';
import { PodaciKupca, Porudzbina, StanjeKorpe, StavkaPorudzbine } from '../models';
import { PORUDZBINE } from './testni-podaci';
import { KASNJENJE } from './kategorije.service';
import { IgrackeService } from './igracke.service';

// Servis za rad sa porudzbinama
@Injectable({ providedIn: 'root' })
export class PorudzbineService {
  private igrackeServis = inject(IgrackeService);

  private porudzbine: Porudzbina[] = PORUDZBINE.map(p => ({ ...p }));
  private izvor = new BehaviorSubject<Porudzbina[]>(this.porudzbine);

  porudzbine$ = this.izvor.asObservable();

  statusi = ['nova', 'u obradi', 'poslata', 'isporucena', 'otkazana'];

  sve(): Observable<Porudzbina[]> {
    return of(this.porudzbine).pipe(delay(KASNJENJE));
  }

  zaKorisnika(kupacId: number): Observable<Porudzbina[]> {
    return of(this.porudzbine.filter(p => p.kupacId === kupacId)).pipe(delay(KASNJENJE));
  }

  poBroju(broj: string): Observable<Porudzbina | undefined> {
    return of(this.porudzbine.find(p => p.broj === broj)).pipe(delay(KASNJENJE));
  }

  // Kreira novu porudzbinu od sadrzaja korpe
  kreiraj(kupac: PodaciKupca, korpa: StanjeKorpe, nacinPlacanja: string,
          kupacId: number | null): Observable<Porudzbina> {
    const stavke: StavkaPorudzbine[] = korpa.stavke.map(s => ({
      naziv: s.igracka.naziv,
      cena: s.igracka.cena,
      kolicina: s.kolicina
    }));

    const id = this.sledeciId();
    const porudzbina: Porudzbina = {
      id: id,
      broj: 'PRD-' + String(id).padStart(4, '0'),
      datum: new Date().toISOString().slice(0, 10),
      kupacId: kupacId,
      kupac: kupac,
      stavke: stavke,
      ukupno: korpa.ukupno,
      nacinPlacanja: nacinPlacanja,
      status: 'nova'
    };

    this.porudzbine = [...this.porudzbine, porudzbina];
    this.izvor.next(this.porudzbine);

    for (const s of stavke) {
      this.igrackeServis.umanjiZalihe(s.naziv, s.kolicina);
    }

    return of(porudzbina).pipe(delay(KASNJENJE));
  }

  promeniStatus(id: number, status: string): Observable<boolean> {
    this.porudzbine = this.porudzbine.map(p => p.id === id ? { ...p, status: status } : p);
    this.izvor.next(this.porudzbine);
    return of(true).pipe(delay(KASNJENJE));
  }

  obrisi(id: number): Observable<boolean> {
    this.porudzbine = this.porudzbine.filter(p => p.id !== id);
    this.izvor.next(this.porudzbine);
    return of(true).pipe(delay(KASNJENJE));
  }

  // Zbirni podaci za kontrolnu tablu
  ukupanPromet(): number {
    let zbir = 0;
    for (const p of this.porudzbine) {
      if (p.status !== 'otkazana') { zbir = zbir + p.ukupno; }
    }
    return zbir;
  }

  brojSa(status: string): number {
    return this.porudzbine.filter(p => p.status === status).length;
  }

  private sledeciId(): number {
    let max = 0;
    for (const p of this.porudzbine) {
      if (p.id > max) { max = p.id; }
    }
    return max + 1;
  }
}
