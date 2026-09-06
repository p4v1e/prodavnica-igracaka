import { Igracka } from './igracka.model';

export interface StavkaKorpe {
  igracka: Igracka;
  kolicina: number;
}

export interface StanjeKorpe {
  stavke: StavkaKorpe[];
  brojArtikala: number;
  medjuzbir: number;
  dostava: number;
  ukupno: number;
}
