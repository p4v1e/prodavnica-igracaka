import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Igracka, Kategorija } from '../../../../models';
import { IgrackeService, KategorijeService } from '../../../../services';

// Podaci koji se prosledjuju dijalogu (prazno za unos nove igracke)
export interface PodaciFormeIgracke {
  igracka?: Igracka;
}

// Dijalog za unos nove i izmenu postojece igracke
@Component({
  selector: 'app-igracka-forma',
  templateUrl: './igracka-forma.component.html',
  styleUrls: ['./igracka-forma.component.css']
})
export class IgrackaFormaComponent {
  private fb = inject(FormBuilder);
  private igrackeServis = inject(IgrackeService);
  private kategorijeServis = inject(KategorijeService);
  private dijalogRef = inject(MatDialogRef<IgrackaFormaComponent>);

  kategorije: Kategorija[] = this.kategorijeServis.sveSinhrono();
  uzrasti = ['0-2', '3-5', '6-8', '9-12'];
  izmena = false;

  forma = this.fb.nonNullable.group({
    naziv: ['', [Validators.required, Validators.minLength(3)]],
    opis: ['', [Validators.required, Validators.minLength(10)]],
    kategorijaId: [1, Validators.required],
    proizvodjac: ['', Validators.required],
    cena: [1000, [Validators.required, Validators.min(1)]],
    uzrast: ['3-5', Validators.required],
    naStanju: [0, [Validators.required, Validators.min(0)]],
    ocena: [0, [Validators.min(0), Validators.max(5)]],
    slika: ['🧸', Validators.required],
    akcija: [false],
    izdvojeno: [false]
  });

  constructor(@Inject(MAT_DIALOG_DATA) public podaci: PodaciFormeIgracke) {
    if (podaci.igracka) {
      this.izmena = true;
      this.forma.patchValue(podaci.igracka);
    }
  }

  sacuvaj(): void {
    if (this.forma.invalid) {
      this.forma.markAllAsTouched();
      return;
    }

    const v = this.forma.getRawValue();

    if (this.izmena && this.podaci.igracka) {
      const izmenjena: Igracka = { ...this.podaci.igracka, ...v };
      this.igrackeServis.izmeni(izmenjena).subscribe(rezultat => this.dijalogRef.close(rezultat));
    } else {
      this.igrackeServis.dodaj(v).subscribe(rezultat => this.dijalogRef.close(rezultat));
    }
  }
}
