import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { KorpaService } from '../../services/korpa.service';
import { NotifikacijeService } from '../../services/notifikacije.service';

// Zaglavlje sa navigacijom, brojem artikala u korpi i menijem korisnika
@Component({
  selector: 'app-zaglavlje',
  templateUrl: './zaglavlje.component.html',
  styleUrls: ['./zaglavlje.component.css']
})
export class ZaglavljeComponent {

  korpa$ = this.korpaServis.stanje$;
  korisnik$ = this.auth.korisnik$;

  constructor(private router: Router,
              private korpaServis: KorpaService,
              private poruke: NotifikacijeService,
              private auth: AuthService) {}

  odjava(): void {
    this.auth.odjava();
    this.poruke.info('Odjavili ste se.');
    this.router.navigate(['/']);
  }
}
