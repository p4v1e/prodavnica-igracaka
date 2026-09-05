# Svet igracaka - prototip web prodavnice

Semestralni projekat. Prototip korisnickog interfejsa sa simulacijom pozadinske
logike na temu prodavnica igracaka.

## Tehnologije

- Angular 18 (projekat zasnovan na modulima)
- TypeScript interfejsi za strukturu podataka
- Angular Material + predefinisana tema indigo-pink
- RxJS (BehaviorSubject, Observable) za simulaciju poziva ka serveru
- CSS Flexbox za raspored elemenata

## Pokretanje

```
npm install
npm start
```

Aplikacija se otvara na http://localhost:4200

## Nalozi za prijavu

- administrator: admin@igracke.rs / admin123
- kupac: marija@primer.rs / marija123

## Struktura

```
src/app/
  models/       TypeScript interfejsi (Igracka, Kategorija, Korpa, Porudzbina, Korisnik)
  services/     servisi koji simuliraju rad sa bazom (nizovi u memoriji)
  guards/       cuvari rute (prijava i administracija)
  shared/       zaglavlje, podnozje, kartica igracke, dijalog potvrde
  pages/        stranice prodavnice i administrativni deo
  material.module.ts
  app-routing.module.ts
  app.module.ts
```

## Rute

| Ruta | Prikaz |
|------|--------|
| / | pocetna strana |
| /katalog | katalog sa pretragom |
| /igracka/:id | detalji igracke |
| /korpa | korpa |
| /placanje | naplata u tri koraka |
| /potvrda/:broj | potvrda porudzbine |
| /prijava | prijava |
| /registracija | registracija |
| /kontakt | kontakt forma |
| /nalog | korisnicki nalog (zasticena ruta) |
| /admin | kontrolna tabla (samo administrator) |
| /admin/igracke | unos, izmena i brisanje artikala |
| /admin/porudzbine | pregled porudzbina i promena statusa |
| /admin/korisnici | pregled korisnika |
| ** | stranica nije pronadjena |

Podaci se cuvaju u memoriji dok traje sesija. Osvezavanjem stranice se vracaju
pocetne vrednosti iz testni-podaci.ts
