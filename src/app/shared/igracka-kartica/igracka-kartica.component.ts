import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Igracka } from '../../models/igracka.model';
import { KorpaService } from '../../services/korpa.service';
import { NotifikacijeService } from '../../services/notifikacije.service';

// Kartica jedne igracke, koristi se na pocetnoj strani i u katalogu
@Component({
  selector: 'app-igracka-kartica',
  templateUrl: './igracka-kartica.component.html',
  styleUrls: ['./igracka-kartica.component.css']
})
export class IgrackaKarticaComponent {
  @Input() igracka!: Igracka;


  constructor(private korpa: KorpaService, private poruke: NotifikacijeService, private router: Router) {}

  otvori(): void {
    this.router.navigate(['/igracka', this.igracka.id]);
  }

  dodajUKorpu(dogadjaj: Event): void {
    dogadjaj.stopPropagation();
    this.korpa.dodaj(this.igracka);
    this.poruke.uspeh('Artikal je dodat u korpu.');
  }
}
