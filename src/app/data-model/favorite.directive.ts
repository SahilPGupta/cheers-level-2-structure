import { Directive, HostListener, Input } from '@angular/core';
import { Cocktail } from './cocktail.model';
import { CocktailsService } from './cocktails.service';
import { Observable } from 'rxjs';

@Directive({
  selector: '[appFavorite]',
  standalone: true
})
export class FavoriteDirective {
  @Input() cocktail: Cocktail;
  allCocktailsData$: Observable<Cocktail[]>;

  constructor(
    private cocktailsService: CocktailsService
  ) { }

  @HostListener('click') onClick(): void {
    if (this.cocktail) {
      let isFavoriteCocktail = !this.isActive();
      this.cocktailsService.changeFavorite(this.cocktail, isFavoriteCocktail)
    }
  }

  isActive(): boolean {
    let isActive = false;
    this.cocktailsService.favorites$.subscribe(favorites => {
      if (favorites?.length) {
        const exist = favorites.find(item => item.id === this.cocktail.id);
        isActive = !!exist;
      }
    });
    return isActive;
  }
}
