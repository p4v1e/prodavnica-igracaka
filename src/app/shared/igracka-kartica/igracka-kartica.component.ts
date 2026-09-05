import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Igracka } from '../../models';
import { KorpaService, NotifikacijeService } from '../../services';

// Kartica jedne igracke, koristi se na pocetnoj strani i u katalogu
@Component({
  selector: 'app-igracka-kartica',
  templateUrl: './igracka-kartica.component.html',
  styleUrls: ['./igracka-kartica.component.css']
})
export class IgrackaKarticaComponent {
  @Input() igracka!: Igracka;

  private korpa = inject(KorpaService);
  private poruke = inject(NotifikacijeService);
  private router = inject(Router);

  otvori(): void {
    this.router.navigate(['/igracka', this.igracka.id]);
  }

  dodajUKorpu(dogadjaj: Event): void {
    dogadjaj.stopPropagation();
    this.korpa.dodaj(this.igracka);
    this.poruke.uspeh('Artikal je dodat u korpu.');
  }
}
