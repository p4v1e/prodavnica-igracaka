import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Igracka } from '../../../../models/igracka.model';
import { Kategorija } from '../../../../models/kategorija.model';
import { IgrackeService } from '../../../../services/igracke.service';
import { KategorijeService } from '../../../../services/kategorije.service';

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

  constructor(private fb: FormBuilder, private igrackeServis: IgrackeService, private kategorijeServis: KategorijeService, private dijalogRef: MatDialogRef<IgrackaFormaComponent>,
              @Inject(MAT_DIALOG_DATA) public podaci: PodaciFormeIgracke) {
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
      const nova: Igracka = { ...v, id: 0, sifra: '' };
      this.igrackeServis.dodaj(nova).subscribe(rezultat => this.dijalogRef.close(rezultat));
    }
  }
}
