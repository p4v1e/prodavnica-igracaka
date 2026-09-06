import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NotifikacijeService } from '../services/notifikacije.service';

// Dozvoljava pristup samo prijavljenim korisnicima
export const authGuard: CanActivateFn = (ruta, stanje) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const poruke = inject(NotifikacijeService);

  if (auth.jePrijavljen) {
    return true;
  }

  poruke.info('Potrebno je da se prijavite.');
  // pamti se gde je korisnik krenuo, da bi se posle prijave vratio tamo
  return router.createUrlTree(['/prijava'], { queryParams: { povratak: stanje.url } });
};

// Dozvoljava pristup samo administratoru
export const adminGuard: CanActivateFn = (ruta, stanje) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const poruke = inject(NotifikacijeService);

  if (auth.jeAdministrator) {
    return true;
  }

  if (!auth.jePrijavljen) {
    return router.createUrlTree(['/prijava'], { queryParams: { povratak: stanje.url } });
  }

  poruke.greska('Nemate pristup administrativnom delu.');
  return router.createUrlTree(['/']);
};
