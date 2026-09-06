// Podaci o jednoj igracki (artiklu u prodavnici)
export interface Igracka {
  id: number;
  sifra: string;
  naziv: string;
  opis: string;
  kategorijaId: number;
  proizvodjac: string;
  cena: number;
  uzrast: string;
  naStanju: number;
  izdvojeno: boolean;
  slika: string;
}

// Kriterijumi za pretragu kataloga
export interface FilterIgracaka {
  pojam: string;
  kategorijaId: number | null;
  uzrast: string;
  minCena: number | null;
  maxCena: number | null;
  sortiranje: string;
}

export const PRAZAN_FILTER: FilterIgracaka = {
  pojam: '',
  kategorijaId: null,
  uzrast: '',
  minCena: null,
  maxCena: null,
  sortiranje: 'naziv'
};
