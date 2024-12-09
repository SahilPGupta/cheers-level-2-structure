import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cocktail } from './cocktail.model';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CocktailsService {
  private favoritesSubject: BehaviorSubject<Cocktail[]> = new BehaviorSubject<Cocktail[]>([]);
  public favorites$: Observable<Cocktail[]> = this.favoritesSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadLocalStorage();
  }

  public getCocktails(): Observable<Cocktail[]> {
    return this.http.get<Cocktail[]>('/cocktails');
  }

  public getCocktailId(id: string | null): Observable<Cocktail> {
    return this.http.get<Cocktail>(`/cocktails/${id}`);
  }

  public changeFavorite(cocktail: Cocktail, favorite: boolean): void {
    if (favorite) {
      this.addFavorite(cocktail);
    } else {
      this.removeFavorite(cocktail);
    }
  }

  private addFavorite(cocktail: Cocktail): void {
    const currentFavorites = this.favoritesSubject.value;
    const cocktailAlreadyAdded = currentFavorites.find(addedCocktail => addedCocktail.id === cocktail.id);
    if (!cocktailAlreadyAdded) {
      const updatedFavorites = [...currentFavorites, cocktail];
      this.favoritesSubject.next(updatedFavorites);
      this.saveLocalStorage(updatedFavorites);
    }
  }

  private removeFavorite(cocktail: Cocktail): void {
    const currentFavorites = this.favoritesSubject.value;
    const updatedFavorites = currentFavorites.filter(addedCocktail => addedCocktail.id !== cocktail.id);
    this.favoritesSubject.next(updatedFavorites);
    this.saveLocalStorage(updatedFavorites);
  }

  private saveLocalStorage(favorites: Cocktail[]): void {
    localStorage.setItem('favoriteCocktailsData', JSON.stringify(favorites));
  }

  private loadLocalStorage(): void {
    const favoriteCocktails = localStorage.getItem('favoriteCocktailsData');
    if (favoriteCocktails) {
      this.favoritesSubject.next(JSON.parse(favoriteCocktails));
    }
  }
}
