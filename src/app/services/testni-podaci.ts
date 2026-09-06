// Testni podaci aplikacije. Servisi ih ucitavaju u nizove i rade sa njima.
import { Igracka } from '../models/igracka.model';
import { Kategorija } from '../models/kategorija.model';
import { Korisnik } from '../models/korisnik.model';
import { Porudzbina } from '../models/porudzbina.model';

export const KATEGORIJE: Kategorija[] = [
  { id: 1, naziv: 'Edukativne igracke', opis: 'Igracke za ucenje i razvoj', slika: '🧠' },
  { id: 2, naziv: 'Kocke i slagalice', opis: 'Kocke, puzle i konstruktori', slika: '🧩' },
  { id: 3, naziv: 'Lutke i plisane igracke', opis: 'Lutke i plisanci', slika: '🧸' },
  { id: 4, naziv: 'Vozila', opis: 'Autici, vozovi i kamioni', slika: '🚗' },
  { id: 5, naziv: 'Drustvene igre', opis: 'Igre za vise igraca', slika: '🎲' },
  { id: 6, naziv: 'Sport', opis: 'Lopte i oprema za igru napolju', slika: '⚽' }
];

export const IGRACKE: Igracka[] = [
  { id: 1,  sifra: 'IGR-001', naziv: 'Drvena kocka sa oblicima', opis: 'Drvena kutija za umetanje geometrijskih oblika.', kategorijaId: 1, proizvodjac: 'Dexyco', cena: 2490, uzrast: '0-2', naStanju: 34, izdvojeno: true,  slika: '🔷' },
  { id: 2,  sifra: 'IGR-002', naziv: 'LEGO kocke 500 delova', opis: 'Set od 500 kocki u vise boja.', kategorijaId: 2, proizvodjac: 'LEGO', cena: 5990, uzrast: '3-5', naStanju: 18, izdvojeno: true,  slika: '🧱' },
  { id: 3,  sifra: 'IGR-003', naziv: 'Plisani meda 45 cm', opis: 'Mekani plisani medved, moze da se pere.', kategorijaId: 3, proizvodjac: 'Pertini', cena: 3290, uzrast: '0-2', naStanju: 47, izdvojeno: true,  slika: '🧸' },
  { id: 4,  sifra: 'IGR-004', naziv: 'Trkacka staza sa autima', opis: 'Staza sa petljom i dva automobila.', kategorijaId: 4, proizvodjac: 'Dexyco', cena: 4590, uzrast: '6-8', naStanju: 12, izdvojeno: true,  slika: '🏎️' },
  { id: 5,  sifra: 'IGR-005', naziv: 'Ne ljuti se covece', opis: 'Drustvena igra za dva do cetiri igraca.', kategorijaId: 5, proizvodjac: 'Pertini', cena: 1590, uzrast: '6-8', naStanju: 63, izdvojeno: false, slika: '🎲' },
  { id: 6,  sifra: 'IGR-006', naziv: 'Fudbalska lopta velicina 5', opis: 'Sivena lopta za trening i rekreaciju.', kategorijaId: 6, proizvodjac: 'Pertini', cena: 2190, uzrast: '9-12', naStanju: 28, izdvojeno: false, slika: '⚽' },
  { id: 7,  sifra: 'IGR-007', naziv: 'Drveni voz sa sinama', opis: 'Set sina sa lokomotivom i vagonima.', kategorijaId: 4, proizvodjac: 'Dexyco', cena: 6490, uzrast: '3-5', naStanju: 9,  izdvojeno: true,  slika: '🚂' },
  { id: 8,  sifra: 'IGR-008', naziv: 'Puzle mapa sveta 500 delova', opis: 'Slagalica sa kartom sveta.', kategorijaId: 2, proizvodjac: 'Pertini', cena: 2790, uzrast: '9-12', naStanju: 15, izdvojeno: false, slika: '🧩' },
  { id: 9,  sifra: 'IGR-009', naziv: 'Lutka sa garderobom', opis: 'Lutka visine 32 cm i tri kompleta odece.', kategorijaId: 3, proizvodjac: 'Dexyco', cena: 4290, uzrast: '3-5', naStanju: 24, izdvojeno: false, slika: '👧' },
  { id: 10, sifra: 'IGR-010', naziv: 'Muzicka kocka za bebe', opis: 'Kocka sa svetlom, zvukom i brojevima.', kategorijaId: 1, proizvodjac: 'Pertini', cena: 3590, uzrast: '0-2', naStanju: 31, izdvojeno: false, slika: '🎵' },
  { id: 11, sifra: 'IGR-011', naziv: 'Romobil sa tri tocka', opis: 'Romobil sa podesivim volanom, nosivost 50 kg.', kategorijaId: 6, proizvodjac: 'Pertini', cena: 7490, uzrast: '3-5', naStanju: 5,  izdvojeno: true,  slika: '🛴' },
  { id: 12, sifra: 'IGR-012', naziv: 'Karte Uno', opis: 'Igra kartama za dva do deset igraca.', kategorijaId: 5, proizvodjac: 'Dexyco', cena: 990,  uzrast: '6-8', naStanju: 88, izdvojeno: false, slika: '🃏' },
  { id: 14, sifra: 'IGR-014', naziv: 'Mikroskop za pocetnike', opis: 'Mikroskop sa tri uvecanja i setom preparata.', kategorijaId: 1, proizvodjac: 'Dexyco', cena: 5490, uzrast: '9-12', naStanju: 11, izdvojeno: false, slika: '🔬' },
  { id: 15, sifra: 'IGR-015', naziv: 'Kamion', opis: 'Kamion sa pokretnim kontejnerom.', kategorijaId: 4, proizvodjac: 'Pertini', cena: 3190, uzrast: '3-5', naStanju: 26, izdvojeno: false, slika: '🚛' },
  { id: 16, sifra: 'IGR-016', naziv: 'Set kuglica za bazen', opis: 'Dvesta mekih kuglica u cetiri boje.', kategorijaId: 6, proizvodjac: 'Pertini', cena: 2890, uzrast: '0-2', naStanju: 0,  izdvojeno: false, slika: '🔴' },
  { id: 17, sifra: 'IGR-017', naziv: 'Sah', opis: 'Sklopiva drvena tabla sa figurama.', kategorijaId: 5, proizvodjac: 'Pertini', cena: 2690, uzrast: '9-12', naStanju: 22, izdvojeno: false, slika: '♟️' },
  { id: 18, sifra: 'IGR-018', naziv: 'Zvucna knjiga Prva slova', opis: 'Knjiga koja izgovara slova i reci.', kategorijaId: 1, proizvodjac: 'Pertini', cena: 2990, uzrast: '3-5', naStanju: 29, izdvojeno: false, slika: '📖' }
];

export const KORISNICI: Korisnik[] = [
  { id: 1, ime: 'Petar',  prezime: 'Ilic',       email: 'admin@igracke.rs',   lozinka: 'admin123',  telefon: '+381 66 55 44 33 22', adresa: 'Bulevar kralja Aleksandra 1111', grad: 'Beograd',    uloga: 'administrator' },
  { id: 2, ime: 'Marija', prezime: 'Jovanovic',  email: 'marija@primer.rs',   lozinka: 'marija123', telefon: '+381 66 55 44 33 22', adresa: 'Njegoseva 1111',                 grad: 'Beograd',    uloga: 'kupac' },
  { id: 3, ime: 'Nikola', prezime: 'Petrovic',   email: 'nikola@primer.rs',   lozinka: 'nikola123', telefon: '+381 66 55 44 33 22', adresa: 'Cara Dusana 1111',                grad: 'Novi Sad',   uloga: 'kupac' },
  { id: 4, ime: 'Jelena', prezime: 'Markovic',   email: 'jelena@primer.rs',   lozinka: 'jelena123', telefon: '+381 66 55 44 33 22', adresa: 'Kneza Milosa 1111',               grad: 'Kragujevac', uloga: 'kupac' }
];

export const PORUDZBINE: Porudzbina[] = [];
