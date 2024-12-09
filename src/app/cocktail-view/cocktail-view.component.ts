import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CocktailsService } from '../data-model/cocktails.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Cocktail } from '../data-model/cocktail.model';
import { Observable, switchMap } from 'rxjs';
import { RouterModule } from '@angular/router';
import { FavoriteDirective } from '../data-model/favorite.directive';

@Component({
  selector: 'app-cocktail-view',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FavoriteDirective,
  ],
  templateUrl: './cocktail-view.component.html',
  styleUrl: './cocktail-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CocktailViewComponent implements OnInit {
  cocktail$: Observable<Cocktail>;

  constructor(
    private cocktailsService: CocktailsService,
    private route: ActivatedRoute,
  ) {}

  isFavorite$: Observable<boolean>;

  ngOnInit() {
    this.cocktail$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        if (id) {
          return this.cocktailsService.getCocktailId(id);
        } else {
          throw new Error('No cocktail found');
        }
      })
    );
  }

  isFavoriteCocktail(id: string) {
    console.log('here');
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
