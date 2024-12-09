export interface Cocktail {
  favorite?: boolean;
  id: string;
  imageUrl: string;
  ingredients: string[];
  instructions: string;
  isAlcoholic: boolean;
  name: string;
}
