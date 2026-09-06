import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NotifikacijeService } from '../../services/notifikacije.service';

@Component({
  selector: 'app-kontakt',
  templateUrl: './kontakt.component.html',
  styleUrls: ['./kontakt.component.css']
})
export class KontaktComponent {

  poslato = false;

  forma = this.fb.nonNullable.group({
    ime: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    poruka: ['', [Validators.required, Validators.minLength(10)]]
  });

  constructor(private fb: FormBuilder, private poruke: NotifikacijeService) {}

  posalji(): void {
    if (this.forma.invalid) {
      this.forma.markAllAsTouched();
      this.poruke.greska('Popunite sva polja forme.');
      return;
    }
    this.poslato = true;
    this.poruke.uspeh('Poruka je poslata.');
    this.forma.reset();
  }
}
