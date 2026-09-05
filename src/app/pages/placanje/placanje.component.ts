import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PodaciKupca, StanjeKorpe } from '../../models';
import { AuthService, KorpaService, NotifikacijeService, PorudzbineService } from '../../services';

// Naplata u koracima: podaci o kupcu, nacin placanja i potvrda
@Component({
  selector: 'app-placanje',
  templateUrl: './placanje.component.html',
  styleUrls: ['./placanje.component.css']
})
export class PlacanjeComponent implements OnInit {
  private fb = inject(FormBuilder);
  private korpaServis = inject(KorpaService);
  private porudzbineServis = inject(PorudzbineService);
  private auth = inject(AuthService);
  private poruke = inject(NotifikacijeService);
  private router = inject(Router);

  stanje: StanjeKorpe = this.korpaServis.stanje;
  slanje = false;

  // Prvi korak - podaci o kupcu i adresa
  formaKupca = this.fb.nonNullable.group({
    ime: ['', [Validators.required, Validators.minLength(2)]],
    prezime: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    telefon: ['', Validators.required],
    adresa: ['', Validators.required],
    grad: ['', Validators.required]
  });

  // Drugi korak - nacin placanja
  formaPlacanja = this.fb.nonNullable.group({
    nacin: ['pouzecem', Validators.required]
  });

  ngOnInit(): void {
    this.korpaServis.stanje$.subscribe(s => this.stanje = s);

    if (this.korpaServis.stanje.stavke.length === 0) {
      this.poruke.info('Korpa je prazna.');
      this.router.navigate(['/katalog']);
      return;
    }

    // Ako je korisnik prijavljen, forma se popunjava njegovim podacima
    const korisnik = this.auth.korisnik;
    if (korisnik) {
      this.formaKupca.patchValue({
        ime: korisnik.ime,
        prezime: korisnik.prezime,
        email: korisnik.email,
        telefon: korisnik.telefon,
        adresa: korisnik.adresa,
        grad: korisnik.grad
      });
    }
  }

  potvrdi(): void {
    if (this.formaKupca.invalid) {
      this.poruke.greska('Popunite sva obavezna polja.');
      return;
    }

    const kupac: PodaciKupca = this.formaKupca.getRawValue();
    const nacin = this.formaPlacanja.controls.nacin.value;
    const kupacId = this.auth.korisnik ? this.auth.korisnik.id : null;

    this.slanje = true;
    this.porudzbineServis.kreiraj(kupac, this.stanje, nacin, kupacId).subscribe(porudzbina => {
      this.korpaServis.isprazni();
      this.slanje = false;
      this.poruke.uspeh('Porudzbina je poslata.');
      this.router.navigate(['/potvrda', porudzbina.broj]);
    });
  }
}
