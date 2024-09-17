import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Ingredient } from '../types/ingredient.types';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  private apiUrl = environment.apiUrl + '/ingredient/';
  private ingredients: BehaviorSubject<Ingredient[]> = new BehaviorSubject<Ingredient[]>([]);

  constructor(private http: HttpClient) {
    this.loadInitialIngredients();
  }

  // Charger les ingrédients initiaux
  private loadInitialIngredients(): void {
    this.http.get<Ingredient[]>(`${this.apiUrl}list`).subscribe({
      next: (ingredients) => this.ingredients.next(ingredients),
      error: (error) => console.error('Error loading initial ingredients', error)
    });
  }

  // Récupérer tous les ingrédients en tant qu'Observable
  getIngredients(): Observable<Ingredient[]> {
    return this.ingredients.asObservable();
  }

  // Définir les ingrédients manuellement (pour des mises à jour en lot par exemple)
  setIngredients(ingredients: Ingredient[]): void {
    this.ingredients.next(ingredients);
  }

  // Ajouter un ingrédient via API et mettre à jour localement
  addIngredient(ingredient: Ingredient): void {
    const newIngredient = { ...ingredient, id: this.generateId() }; // Générer un ID temporaire
    this.http.post<Ingredient>(`${this.apiUrl}new`, newIngredient).subscribe({
      next: (createdIngredient) => {
        const currentIngredients = this.ingredients.value;
        this.ingredients.next([...currentIngredients, createdIngredient]); // Ajouter le nouvel ingrédient
      },
      error: (error) => console.error('Error adding ingredient', error)
    });
  }

  // Obtenir un ingrédient par ID
  getIngredientById(id: string): Observable<Ingredient> {
    return this.http.get<Ingredient>(`${this.apiUrl}${id}`);
  }

  // Mettre à jour un ingrédient existant
  updateIngredient(id: string, updatedIngredient: Ingredient): void {
    this.http.put<Ingredient>(`${this.apiUrl}update/${id}`, updatedIngredient).subscribe({
      next: (responseIngredient) => {
        const currentIngredients = this.ingredients.value.map(ingredient => 
          ingredient.id === id ? responseIngredient : ingredient
        );
        this.ingredients.next(currentIngredients); // Mettre à jour localement
      },
      error: (error) => console.error('Error updating ingredient', error)
    });
  }

  // Supprimer un ingrédient par ID
  deleteIngredient(id: string): void {
    this.http.delete(`${this.apiUrl}delete/${id}`).subscribe({
      next: () => {
        const currentIngredients = this.ingredients.value.filter(ingredient => ingredient.id !== id);
        this.ingredients.next(currentIngredients); // Mettre à jour localement
      },
      error: (error) => console.error('Error deleting ingredient', error)
    });
  }

  // Générer un nouvel ID pour un ingrédient (localement, temporairement)
  private generateId(): string {
    const currentIngredients = this.ingredients.value;
    return `ingredient-${currentIngredients.length > 0 ? currentIngredients.length + 1 : 1}`;
  }
}
