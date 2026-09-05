import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, delay, of } from 'rxjs';
import { Korisnik, OdgovorPrijave, PodaciPrijave } from '../models';
import { KORISNICI } from './testni-podaci';
import { KASNJENJE } from './kategorije.service';

// Servis za prijavu korisnika i evidenciju naloga.
// Prijava je simulirana - podaci se porede sa testnim korisnicima.
@Injectable({ providedIn: 'root' })
export class AuthService {
  private korisnici: Korisnik[] = KORISNICI.map(k => ({ ...k }));
  private trenutni = new BehaviorSubject<Korisnik | null>(null);
  private izvorKorisnika = new BehaviorSubject<Korisnik[]>(this.korisnici);

  korisnik$ = this.trenutni.asObservable();
  korisnici$ = this.izvorKorisnika.asObservable();

  get korisnik(): Korisnik | null {
    return this.trenutni.value;
  }

  get jePrijavljen(): boolean {
    return this.trenutni.value !== null;
  }

  get jeAdministrator(): boolean {
    return this.trenutni.value !== null && this.trenutni.value.uloga === 'administrator';
  }

  prijava(podaci: PodaciPrijave): Observable<OdgovorPrijave> {
    const nadjen = this.korisnici.find(k =>
      k.email.toLowerCase() === podaci.email.trim().toLowerCase() && k.lozinka === podaci.lozinka);

    if (!nadjen) {
      return of({ uspeh: false, poruka: 'Pogresna e-adresa ili lozinka.' }).pipe(delay(KASNJENJE));
    }

    this.trenutni.next(nadjen);
    return of({ uspeh: true, poruka: 'Dobro dosli, ' + nadjen.ime + '!', korisnik: nadjen })
      .pipe(delay(KASNJENJE));
  }

  registracija(podaci: Omit<Korisnik, 'id' | 'uloga'>): Observable<OdgovorPrijave> {
    const zauzet = this.korisnici.some(k => k.email.toLowerCase() === podaci.email.trim().toLowerCase());
    if (zauzet) {
      return of({ uspeh: false, poruka: 'Nalog sa unetom e-adresom vec postoji.' }).pipe(delay(KASNJENJE));
    }

    const novi: Korisnik = { ...podaci, id: this.sledeciId(), uloga: 'kupac' };
    this.korisnici = [...this.korisnici, novi];
    this.izvorKorisnika.next(this.korisnici);
    this.trenutni.next(novi);

    return of({ uspeh: true, poruka: 'Nalog je kreiran.', korisnik: novi }).pipe(delay(KASNJENJE));
  }

  odjava(): void {
    this.trenutni.next(null);
  }

  izmeniKorisnika(izmenjen: Korisnik): Observable<Korisnik> {
    this.korisnici = this.korisnici.map(k => k.id === izmenjen.id ? izmenjen : k);
    this.izvorKorisnika.next(this.korisnici);
    if (this.trenutni.value !== null && this.trenutni.value.id === izmenjen.id) {
      this.trenutni.next(izmenjen);
    }
    return of(izmenjen).pipe(delay(KASNJENJE));
  }

  obrisiKorisnika(id: number): Observable<boolean> {
    this.korisnici = this.korisnici.filter(k => k.id !== id);
    this.izvorKorisnika.next(this.korisnici);
    return of(true).pipe(delay(KASNJENJE));
  }

  private sledeciId(): number {
    let max = 0;
    for (const k of this.korisnici) {
      if (k.id > max) { max = k.id; }
    }
    return max + 1;
  }
}
