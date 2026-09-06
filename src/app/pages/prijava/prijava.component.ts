import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NotifikacijeService } from '../../services/notifikacije.service';

@Component({
  selector: 'app-prijava',
  templateUrl: './prijava.component.html',
  styleUrls: ['./prijava.component.css']
})
export class PrijavaComponent implements OnInit {

  forma = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    lozinka: ['', [Validators.required, Validators.minLength(5)]]
  });

  greska = '';
  slanje = false;
  private povratnaRuta = '/';

  constructor(private fb: FormBuilder,
              private auth: AuthService,
              private router: Router,
              private ruta: ActivatedRoute,
              private poruke: NotifikacijeService) {}

  ngOnInit(): void {
    const povratak = this.ruta.snapshot.queryParamMap.get('povratak');
    if (povratak) {
      this.povratnaRuta = povratak;
    }
  }

  prijavi(): void {
    if (this.forma.invalid) {
      this.forma.markAllAsTouched();
      return;
    }

    this.slanje = true;
    this.greska = '';

    this.auth.prijava(this.forma.getRawValue()).subscribe(odgovor => {
      this.slanje = false;
      if (!odgovor.uspeh) {
        this.greska = odgovor.poruka;
        return;
      }
      this.poruke.uspeh(odgovor.poruka);
      this.router.navigateByUrl(this.povratnaRuta);
    });
  }
}
