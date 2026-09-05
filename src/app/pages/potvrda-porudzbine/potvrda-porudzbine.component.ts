import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Porudzbina } from '../../models';
import { PorudzbineService } from '../../services';

// Potvrda kreirane porudzbine
@Component({
  selector: 'app-potvrda-porudzbine',
  templateUrl: './potvrda-porudzbine.component.html',
  styleUrls: ['./potvrda-porudzbine.component.css']
})
export class PotvrdaPorudzbineComponent implements OnInit {
  private ruta = inject(ActivatedRoute);
  private porudzbineServis = inject(PorudzbineService);

  porudzbina?: Porudzbina;
  ucitavanje = true;

  ngOnInit(): void {
    const broj = this.ruta.snapshot.paramMap.get('broj') || '';
    this.porudzbineServis.poBroju(broj).subscribe(p => {
      this.porudzbina = p;
      this.ucitavanje = false;
    });
  }
}
