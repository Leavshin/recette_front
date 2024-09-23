// @ts-ignore
import { Injectable } from '@angular/core';
// @ts-ignore
import { HttpClient } from '@angular/common/http';
// @ts-ignore
import { catchError, Observable, BehaviorSubject, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Ingredient } from '../types/ingredient.types';

// @ts-ignore
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
      next: (ingredients: any) => this.ingredients.next(ingredients),
      error: (error: any) => console.error('Error loading initial ingredients', error)
    });
  }

  getAllIngredients(): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(`${this.apiUrl}list`).pipe(
      catchError((error: { message: any; }) => {
        alert(error.message);
        return of();
      })
    )
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
      next: (createdIngredient: any) => {
        const currentIngredients = this.ingredients.value;
        this.ingredients.next([...currentIngredients, createdIngredient]); // Ajouter le nouvel ingrédient
      },
      error: (error: any) => console.error('Error adding ingredient', error)
    });
  }

  // Obtenir un ingrédient par ID
  getIngredientById(id: string): Observable<Ingredient> {
    return this.http.get<Ingredient>(`${this.apiUrl}${id}`);
  }

  // Mettre à jour un ingrédient existant
  updateIngredient(id: number, updatedIngredient: Ingredient): void {
    this.http.put<Ingredient>(`${this.apiUrl}update/${id}`, updatedIngredient).subscribe({
      next: (responseIngredient: any) => {
        const currentIngredients = this.ingredients.value.map((ingredient: { id: number; }) =>
          ingredient.id === id ? responseIngredient : ingredient
        );
        this.ingredients.next(currentIngredients); // Mettre à jour localement
      },
      error: (error: any) => console.error('Error updating ingredient', error)
    });
  }

  // Supprimer un ingrédient par ID
  deleteIngredient(id: number): void {
    this.http.delete(`${this.apiUrl}delete/${id}`).subscribe({
      next: () => {
        const currentIngredients = this.ingredients.value.filter((ingredient: { id: number; }) => ingredient.id !== id);
        this.ingredients.next(currentIngredients); // Mettre à jour localement
      },
      error: (error: any) => console.error('Error deleting ingredient', error)
    });
  }

  // Générer un nouvel ID pour un ingrédient (localement, temporairement)
  private generateId(): string {
    const currentIngredients = this.ingredients.value;
    return `ingredient-${currentIngredients.length > 0 ? currentIngredients.length + 1 : 1}`;
  }
}
