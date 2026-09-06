import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Korisnik } from '../../models/korisnik.model';
import { AuthService } from '../../services/auth.service';
import { NotifikacijeService } from '../../services/notifikacije.service';

@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.component.html',
  styleUrls: ['./registracija.component.css']
})
export class RegistracijaComponent {

  forma = this.fb.nonNullable.group({
    ime: ['', [Validators.required, Validators.minLength(2)]],
    prezime: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    telefon: ['', Validators.required],
    adresa: ['', Validators.required],
    grad: ['', Validators.required],
    lozinka: ['', [Validators.required, Validators.minLength(5)]],
    potvrdaLozinke: ['', Validators.required]
  });

  greska = '';
  slanje = false;

  constructor(private fb: FormBuilder,
              private auth: AuthService,
              private router: Router,
              private poruke: NotifikacijeService) {}

  registruj(): void {
    if (this.forma.invalid) {
      this.forma.markAllAsTouched();
      this.greska = 'Nisu sva polja ispravno popunjena.';
      return;
    }

    const v = this.forma.getRawValue();

    if (v.lozinka !== v.potvrdaLozinke) {
      this.greska = 'Unete lozinke se ne poklapaju.';
      return;
    }

    this.slanje = true;
    this.greska = '';

    const novi: Korisnik = {
      id: 0,
      ime: v.ime, prezime: v.prezime, email: v.email, lozinka: v.lozinka,
      telefon: v.telefon, adresa: v.adresa, grad: v.grad,
      uloga: 'kupac'
    };

    this.auth.registracija(novi).subscribe(odgovor => {
      this.slanje = false;
      if (!odgovor.uspeh) {
        this.greska = odgovor.poruka;
        return;
      }
      this.poruke.uspeh(odgovor.poruka);
      this.router.navigate(['/nalog']);
    });
  }
}
