import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Korisnik, Porudzbina } from '../../models';
import { AuthService, NotifikacijeService, PorudzbineService } from '../../services';

// Korisnicki nalog: licni podaci i pregled porudzbina
@Component({
  selector: 'app-moj-nalog',
  templateUrl: './moj-nalog.component.html',
  styleUrls: ['./moj-nalog.component.css']
})
export class MojNalogComponent implements OnInit {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private porudzbineServis = inject(PorudzbineService);
  private poruke = inject(NotifikacijeService);

  korisnik: Korisnik | null = null;
  porudzbine: Porudzbina[] = [];
  kolone = ['broj', 'datum', 'artikli', 'iznos', 'status'];

  forma = this.fb.nonNullable.group({
    ime: ['', [Validators.required, Validators.minLength(2)]],
    prezime: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    telefon: ['', Validators.required],
    adresa: ['', Validators.required],
    grad: ['', Validators.required]
  });

  ngOnInit(): void {
    this.auth.korisnik$.subscribe(k => {
      this.korisnik = k;
      if (!k) { return; }
      this.forma.patchValue({
        ime: k.ime, prezime: k.prezime, email: k.email,
        telefon: k.telefon, adresa: k.adresa, grad: k.grad
      });
      this.porudzbineServis.zaKorisnika(k.id).subscribe(lista => this.porudzbine = lista);
    });
  }

  sacuvaj(): void {
    if (this.forma.invalid || !this.korisnik) {
      this.poruke.greska('Proverite unete podatke.');
      return;
    }
    const izmenjen: Korisnik = { ...this.korisnik, ...this.forma.getRawValue() };
    this.auth.izmeniKorisnika(izmenjen).subscribe(() => this.poruke.uspeh('Podaci su sacuvani.'));
  }

  brojArtikala(p: Porudzbina): number {
    let broj = 0;
    for (const s of p.stavke) {
      broj = broj + s.kolicina;
    }
    return broj;
  }
}
