import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Recipe } from '../types/recipe.types';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private apiUrl = environment.apiUrl + '/recipe/';
  private recipes: BehaviorSubject<Recipe[]> = new BehaviorSubject<Recipe[]>([]);

  constructor(private http: HttpClient) {
    this.loadInitialRecipes();
  }

  // Charger les recettes initiales
  private loadInitialRecipes(): void {
    this.http.get<Recipe[]>(`${this.apiUrl}list`).subscribe({
      next: (recipes) => this.recipes.next(recipes),
      error: (error) => console.error('Error loading initial recipes', error)
    });
  }

  // Récupérer toutes les recettes en tant qu'Observable
  getRecipes(): Observable<Recipe[]> {
    return this.recipes.asObservable();
  }

  // Définir les recettes manuellement (pour des mises à jour en lot par exemple)
  setRecipes(recipes: Recipe[]): void {
    this.recipes.next(recipes);
  }

  // Ajouter une recette via API et mettre à jour localement
  addRecipe(recipe: Recipe): void {
    const newRecipe = { ...recipe, id: this.generateId() }; // Générer un ID temporaire
    this.http.post<Recipe>(`${this.apiUrl}new`, newRecipe).subscribe({
      next: (createdRecipe) => {
        const currentRecipes = this.recipes.value;
        this.recipes.next([...currentRecipes, createdRecipe]); // Ajouter la nouvelle recette
      },
      error: (error) => console.error('Error adding recipe', error)
    });
  }

  // Obtenir une recette par ID
  getRecipeById(id: number): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.apiUrl}${id}`);
  }

  // Mettre à jour une recette existante
  updateRecipe(id: number, updatedRecipe: Recipe): void {
    this.http.put<Recipe>(`${this.apiUrl}update/${id}`, updatedRecipe).subscribe({
      next: (responseRecipe) => {
        const currentRecipes = this.recipes.value.map(recipe => 
          recipe.id === id ? responseRecipe : recipe
        );
        this.recipes.next(currentRecipes); // Mettre à jour localement
      },
      error: (error) => console.error('Error updating recipe', error)
    });
  }

  // Supprimer une recette par ID
  deleteRecipe(id: number): void {
    this.http.delete(`${this.apiUrl}delete/${id}`).subscribe({
      next: () => {
        const currentRecipes = this.recipes.value.filter(recipe => recipe.id !== id);
        this.recipes.next(currentRecipes); // Mettre à jour localement
      },
      error: (error) => console.error('Error deleting recipe', error)
    });
  }

  // Générer un nouvel ID pour une recette (localement, temporairement)
  private generateId(): number {
    const currentRecipes = this.recipes.value;
    return currentRecipes.length > 0 ? Math.max(...currentRecipes.map(r => r.id)) + 1 : 1;
  }
}