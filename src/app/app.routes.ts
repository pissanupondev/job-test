import { Routes } from '@angular/router';

export const routes: Routes = [
 {
    path: '',
    loadChildren: () =>
      import('./features/person/person.routes')
        .then(m => m.PERSON_ROUTES)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
