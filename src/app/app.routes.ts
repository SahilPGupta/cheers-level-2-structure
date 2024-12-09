import { Routes } from '@angular/router';
import { CocktailListComponent } from './cocktail-list/cocktail-list.component';
import { CocktailViewComponent } from './cocktail-view/cocktail-view.component';

export const routes: Routes = [
  { path: 'cocktails', component: CocktailListComponent },
  { path: 'cocktails/:id', component: CocktailViewComponent },
  // wild card entries
  { path: '', redirectTo: '/cocktails', pathMatch: 'full' },
  { path: '**', redirectTo: '/cocktails', pathMatch: 'full' },
];
