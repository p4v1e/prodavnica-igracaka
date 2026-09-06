import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Porudzbina } from '../../models/porudzbina.model';
import { PorudzbineService } from '../../services/porudzbine.service';

@Component({
  selector: 'app-potvrda-porudzbine',
  templateUrl: './potvrda-porudzbine.component.html',
  styleUrls: ['./potvrda-porudzbine.component.css']
})
export class PotvrdaPorudzbineComponent implements OnInit {

  porudzbina?: Porudzbina;
  ucitavanje = true;

  constructor(private ruta: ActivatedRoute, private porudzbineServis: PorudzbineService) {}

  ngOnInit(): void {
    const broj = this.ruta.snapshot.paramMap.get('broj') || '';
    this.porudzbineServis.poBroju(broj).subscribe(p => {
      this.porudzbina = p;
      this.ucitavanje = false;
    });
  }
}
