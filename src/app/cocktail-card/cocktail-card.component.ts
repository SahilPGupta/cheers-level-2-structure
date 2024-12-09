import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Cocktail } from '../data-model/cocktail.model';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FavoriteDirective } from '../data-model/favorite.directive';
import { CocktailsService } from '../data-model/cocktails.service';

@Component({
  selector: 'app-cocktail-card',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    FavoriteDirective,
  ],
  templateUrl: './cocktail-card.component.html',
  styleUrl: './cocktail-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CocktailCardComponent{
  @Input() cocktail: Cocktail;

  constructor(private cocktailsService: CocktailsService) {}

  isFavoriteCocktail(id: string) {
    let isActive = false;
    this.cocktailsService.favorites$.subscribe(favorites => {
      if (favorites?.length) {
        const exist = favorites.find(item => item.id == id);
        isActive = !!exist;
      }
    });
    return isActive;
  }

}
