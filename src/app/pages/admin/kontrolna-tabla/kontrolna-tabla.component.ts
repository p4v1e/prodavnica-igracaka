import { Component, OnInit } from '@angular/core';
import { Igracka } from '../../../models/igracka.model';
import { Porudzbina } from '../../../models/porudzbina.model';
import { IgrackeService } from '../../../services/igracke.service';
import { PorudzbineService } from '../../../services/porudzbine.service';

// Kontrolna tabla sa osnovnim pokazateljima poslovanja
@Component({
  selector: 'app-kontrolna-tabla',
  templateUrl: './kontrolna-tabla.component.html',
  styleUrls: ['./kontrolna-tabla.component.css']
})
export class KontrolnaTablaComponent implements OnInit {

  brojArtikala = 0;
  rasprodato = 0;
  brojPorudzbina = 0;
  promet = 0;

  niskeZalihe: Igracka[] = [];
  poslednje: Porudzbina[] = [];
  kolone = ['broj', 'kupac', 'datum', 'iznos', 'status'];

  constructor(private igrackeServis: IgrackeService, private porudzbineServis: PorudzbineService) {}

  ngOnInit(): void {
    this.igrackeServis.igracke$.subscribe(() => this.osvezi());
    this.porudzbineServis.porudzbine$.subscribe(() => this.osvezi());
  }

  private osvezi(): void {
    const igracke = this.igrackeServis.sveSinhrono();

    this.brojArtikala = igracke.length;
    this.rasprodato = igracke.filter(i => i.naStanju === 0).length;
    this.promet = this.porudzbineServis.ukupanPromet();

    this.niskeZalihe = igracke.filter(i => i.naStanju < 10);

    this.porudzbineServis.sve().subscribe(lista => {
      this.brojPorudzbina = lista.length;
      this.poslednje = lista.slice(-5).reverse();
    });
  }
}
