import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, KorpaService, NotifikacijeService } from '../../services';

// Zaglavlje sa navigacijom, brojem artikala u korpi i menijem korisnika
@Component({
  selector: 'app-zaglavlje',
  templateUrl: './zaglavlje.component.html',
  styleUrls: ['./zaglavlje.component.css']
})
export class ZaglavljeComponent {
  private router = inject(Router);
  private korpaServis = inject(KorpaService);
  private poruke = inject(NotifikacijeService);
  private auth = inject(AuthService);

  korpa$ = this.korpaServis.stanje$;
  korisnik$ = this.auth.korisnik$;

  odjava(): void {
    this.auth.odjava();
    this.poruke.info('Odjavili ste se.');
    this.router.navigate(['/']);
  }
}
