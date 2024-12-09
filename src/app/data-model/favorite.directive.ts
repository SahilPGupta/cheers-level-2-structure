import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';
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
  isFavoriteCocktail: boolean = false;

  constructor(
    private element: ElementRef,
    private renderer: Renderer2,
    private cocktailsService: CocktailsService
  ) { }

  ngOnInit(): void {
    this.allCocktailsData$ = this.cocktailsService.favorites$;
  }

  @HostListener('click') onClick(): void {
    if (this.cocktail) {
      this.isFavoriteCocktail = !this.isActive();
      if (this.isFavoriteCocktail) {
        this.renderer.addClass(this.element.nativeElement, "active");
      } else {
        this.renderer.removeClass(this.element.nativeElement, "active");
      }
      this.cocktailsService.changeFavorite(this.cocktail, this.isFavoriteCocktail)
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


