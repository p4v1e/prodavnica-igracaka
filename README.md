Svet igracaka - prototip web prodavnice igracaka
================================================

Semestralni projekat. Prototip korisnickog interfejsa sa simulacijom
pozadinske logike, tema prodavnica igracaka.

Tehnologije: Angular 18, TypeScript, Angular Material (tema indigo-pink),
RxJS, CSS Flexbox.


Pokretanje
----------

  npm install
  npm start

Aplikacija se otvara na http://localhost:4200


Nalozi za prijavu
-----------------

  administrator   admin@igracke.rs    admin123
  kupac           marija@primer.rs    marija123


Struktura foldera
-----------------

  src/app/models      interfejsi koji opisuju strukturu podataka
  src/app/services    servisi sa testnim podacima i logikom
  src/app/guards      provera pristupa nalogu i administraciji
  src/app/shared      zaglavlje, podnozje, kartica igracke, dijalog
  src/app/pages       stranice prodavnice i administracije


Napomena
--------

Podaci se cuvaju u memoriji dok traje sesija. Osvezavanjem stranice se
vracaju pocetne vrednosti iz services/testni-podaci.ts. Spisak porudzbina
je na pocetku prazan - porudzbine nastaju tek kupovinom u aplikaciji.
