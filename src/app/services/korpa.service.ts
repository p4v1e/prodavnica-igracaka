import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Igracka } from '../models/igracka.model';
import { StanjeKorpe, StavkaKorpe } from '../models/korpa.model';

const CENA_DOSTAVE = 390;
const PRAG_BESPLATNE_DOSTAVE = 4000;

// Servis korpe. Sadrzaj korpe se cuva u toku sesije.
@Injectable({ providedIn: 'root' })
export class KorpaService {

  private stavke: StavkaKorpe[] = [];
  private izvor = new BehaviorSubject<StanjeKorpe>(this.obracunaj());

  stanje$ = this.izvor.asObservable();

  get stanje(): StanjeKorpe {
    return this.izvor.value;
  }

  dodaj(igracka: Igracka, kolicina: number = 1): void {
    const postojeca = this.stavke.find(s => s.igracka.id === igracka.id);
    if (postojeca) {
      postojeca.kolicina = postojeca.kolicina + kolicina;
    } else {
      this.stavke.push({ igracka: igracka, kolicina: kolicina });
    }
    this.izvor.next(this.obracunaj());
  }

  izmeniKolicinu(igrackaId: number, kolicina: number): void {
    if (kolicina <= 0) {
      this.ukloni(igrackaId);
      return;
    }
    const stavka = this.stavke.find(s => s.igracka.id === igrackaId);
    if (stavka) {
      stavka.kolicina = kolicina;
    }
    this.izvor.next(this.obracunaj());
  }

  ukloni(igrackaId: number): void {
    this.stavke = this.stavke.filter(s => s.igracka.id !== igrackaId);
    this.izvor.next(this.obracunaj());
  }

  isprazni(): void {
    this.stavke = [];
    this.izvor.next(this.obracunaj());
  }

  // Racuna broj artikala, medjuzbir, dostavu i ukupan iznos
  private obracunaj(): StanjeKorpe {
    let brojArtikala = 0;
    let medjuzbir = 0;
    for (const s of this.stavke) {
      brojArtikala = brojArtikala + s.kolicina;
      medjuzbir = medjuzbir + s.igracka.cena * s.kolicina;
    }

    let dostava = CENA_DOSTAVE;
    if (medjuzbir === 0 || medjuzbir >= PRAG_BESPLATNE_DOSTAVE) {
      dostava = 0;
    }

    return {
      stavke: this.stavke,
      brojArtikala: brojArtikala,
      medjuzbir: medjuzbir,
      dostava: dostava,
      ukupno: medjuzbir + dostava
    };
  }
}
