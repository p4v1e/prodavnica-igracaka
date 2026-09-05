// Registrovani korisnik
export interface Korisnik {
  id: number;
  ime: string;
  prezime: string;
  email: string;
  lozinka: string;
  telefon: string;
  adresa: string;
  grad: string;
  uloga: string;
}

export interface PodaciPrijave {
  email: string;
  lozinka: string;
}

export interface OdgovorPrijave {
  uspeh: boolean;
  poruka: string;
  korisnik?: Korisnik;
}
