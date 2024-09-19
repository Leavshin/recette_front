// @ts-ignore
import {Injectable} from '@angular/core';
// @ts-ignore
import {HttpClient} from '@angular/common/http';
// @ts-ignore
import {catchError, Observable, BehaviorSubject, of} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Recipe} from '../types/recipe.types';

// @ts-ignore
@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private apiUrl = environment.apiUrl + '/recipe/';
  private recipes: BehaviorSubject<Recipe[]> = new BehaviorSubject<Recipe[]>([]);

  constructor(private http: HttpClient) {
    // this.loadInitialRecipes();
  }

  getAllRecipe(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.apiUrl}list`).pipe(
      catchError((error: { message: any; }) => {
        alert(error.message);
        return of();
      })
    )
  }

  addRecipe(recipe: Omit<Recipe, 'id'>): Observable<Recipe> {
    console.log("peut etre recipe")
    console.log(recipe);
    return this.http.post<Recipe>(`${this.apiUrl}new`, recipe).pipe(
      catchError((err: { message: any; }) => {
        alert(`Error adding recipe: ${err.message}`);
        return of();
      })
    );
  }

  // // Obtenir une recette par ID
  // getRecipeById(id: number): Observable<Recipe> {
  //   return this.http.get<Recipe>(`${this.apiUrl}${id}`);
  // }
  //
  // // Mettre à jour une recette existante
  // updateRecipe(id: number, updatedRecipe: Recipe): void {
  //   this.http.put<Recipe>(`${this.apiUrl}update/${id}`, updatedRecipe).subscribe({
  //     next: (responseRecipe: any) => {
  //       const currentRecipes = this.recipes.value.map((recipe: { id: number; }) =>
  //         recipe.id === id ? responseRecipe : recipe
  //       );
  //       this.recipes.next(currentRecipes); // Mettre à jour localement
  //     },
  //     error: (error: any) => console.error('Error updating recipe', error)
  //   });
  // }
  //
  // Supprimer une recette par ID
  deleteRecipe(id: number): void {
    this.http.get(`${this.apiUrl}delete/${id}`).subscribe({
      error: (error: any) => console.error('Error deleting recipe', error)
    });
  }

  addFavorite(id: number): void {
    //Quand la création de compte sera faites : décommenter la ligne en dessous et faire la liaison avec idAcount et supprimer celle encore en dessous
    // this.http.post<number>(`${this.apiUrl}add_recipe_to_favorite/${idAccount}`, id).pipe(
    this.http.post<number>(`${this.apiUrl}add_recipe_to_favorite/`, id).pipe(
      catchError((err: { message: any; }) => {
        alert(`Error adding recipe: ${err.message}`);
        return of();
      })
    );
  }

}
