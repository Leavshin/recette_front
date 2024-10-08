import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import {catchError, Observable, of} from 'rxjs';
import { User } from '../types/user.types';
import { Recipe } from '../types/recipe.types';
import { Inventory } from '../types/inventory.types';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl + '/user/';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}list`);
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}${id}`, user);
  }

  getFavoriteRecipes(userId: number): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.apiUrl}${userId}/favorite-recipes`);
  }

  addFavoriteRecipe(userId: number, recipeId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}${userId}/favorite-recipes`, { recipeId });
  }

  removeFavoriteRecipe(userId: number, recipeId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${userId}/favorite-recipes/${recipeId}`);
  }

  addIngredient(inventoryItems: Inventory[]): Observable<Inventory[]> {
    return this.http.post<Inventory[]>(`${this.apiUrl}addIngredients`, inventoryItems);
  }

  removeIngredient(inventoryItems: Inventory[]): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}removeIngredients`, inventoryItems);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}${id}`).pipe(
      catchError((error: { message: any; }) => {
        alert(error.message);
        return of();
      })
    )
  }
}
