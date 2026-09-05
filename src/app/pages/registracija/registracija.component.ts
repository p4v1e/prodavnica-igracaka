import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, NotifikacijeService } from '../../services';

// Otvaranje novog korisnickog naloga
@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.component.html',
  styleUrls: ['./registracija.component.css']
})
export class RegistracijaComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);
  private poruke = inject(NotifikacijeService);

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

    this.auth.registracija({
      ime: v.ime, prezime: v.prezime, email: v.email, lozinka: v.lozinka,
      telefon: v.telefon, adresa: v.adresa, grad: v.grad
    }).subscribe(odgovor => {
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
