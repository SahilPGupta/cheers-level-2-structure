import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CocktailCardComponent } from '../cocktail-card/cocktail-card.component';
import { Cocktail } from '../data-model/cocktail.model';
import { CocktailsService } from '../data-model/cocktails.service';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-cocktail-list',
  standalone: true,
  templateUrl: './cocktail-list.component.html',
  styleUrls: ['./cocktail-list.component.scss'],
  imports: [
    CocktailCardComponent,
    CommonModule,
    ReactiveFormsModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CocktailListComponent implements OnInit {
  allCocktailsData$: Observable<Cocktail[]>;
  searchText = new FormControl('');

  constructor(private cocktailsService: CocktailsService) {}

  ngOnInit() {
    this.allCocktailsData$ = this.searchText.valueChanges.pipe(
      startWith(''),
      switchMap(text => this.filterCocktail(text))
    );
  }

  filterCocktail(text: string | null): Observable<Cocktail[]> {
    const searchValue = text || '';
    return this.cocktailsService.getCocktails().pipe(
      map(cocktails => cocktails.filter(cocktail =>
        cocktail.name.toLowerCase().includes(searchValue.toLowerCase())
      ))
    );
  }
}
