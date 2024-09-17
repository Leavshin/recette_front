import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../types/user.types';
import { Recipe } from '../types/recipe.types';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}/users`);
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${environment.apiUrl}/users/${id}`, user);
  }

  getFavoriteRecipes(userId: number): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.apiUrl}/users/${userId}/favorite-recipes`);
  }

  addFavoriteRecipe(userId: number, recipeId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/users/${userId}/favorite-recipes`, { recipeId });
  }

  removeFavoriteRecipe(userId: number, recipeId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/users/${userId}/favorite-recipes/${recipeId}`);
  }
}
