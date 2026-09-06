// Podaci o kupcu i adresi dostave
export interface PodaciKupca {
  ime: string;
  prezime: string;
  email: string;
  telefon: string;
  adresa: string;
  grad: string;
}

export interface StavkaPorudzbine {
  naziv: string;
  cena: number;
  kolicina: number;
}

export interface Porudzbina {
  id: number;
  broj: string;
  datum: string;
  kupacId: number | null;
  kupac: PodaciKupca;
  stavke: StavkaPorudzbine[];
  ukupno: number;
  nacinPlacanja: string;
  status: string;
}
