import { Igracka } from './igracka.model';

// Jedna stavka u korpi
export interface StavkaKorpe {
  igracka: Igracka;
  kolicina: number;
}

// Obracunato stanje korpe
export interface StanjeKorpe {
  stavke: StavkaKorpe[];
  brojArtikala: number;
  medjuzbir: number;
  dostava: number;
  ukupno: number;
}
