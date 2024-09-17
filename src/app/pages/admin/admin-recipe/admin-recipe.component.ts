import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RecipeService } from '../../../utils/services/recipe.service';
import { Recipe } from '../../../utils/types/recipe.types';

@Component({
  selector: 'app-admin-recipe',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-recipe.component.html',
  styleUrls: ['./admin-recipe.component.css']
})
export class AdminRecipeComponent implements OnInit {
  pendingRecipes: Recipe[] = [];
  nouvelleRecette: Recipe = {
    id: 0,
    name: '',
    portion: 0,
    image_url: '',
    prep_time: '',
    cook_time: '',
    category: '',
    description: '',
  };
  editMode: boolean = false;  // Flag pour savoir si l'on est en mode édition
  recipeToEdit: Recipe | null = null;  // Pour stocker la recette à modifier
  
  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.loadPendingRecipes();
  }

  loadPendingRecipes(): void {
    this.recipeService.getRecipes().subscribe({
      next: (recipes) => this.pendingRecipes = recipes,
      error: (error) => console.error('Error fetching pending recipes', error)
    });
  }

  viewRecipe(recipeId: number): void {
    // Implémentez la logique pour afficher la recette
    console.log(`Viewing recipe with id: ${recipeId}`);
  }

  addRecipe(recipe: Recipe): void {
    if (this.editMode && this.recipeToEdit) {
      // Si nous sommes en mode édition, met à jour la recette existante
      const index = this.pendingRecipes.findIndex(r => r.id === this.recipeToEdit?.id);
      if (index !== -1) {
        this.pendingRecipes[index] = { ...recipe, id: this.recipeToEdit.id };
        this.recipeService.setRecipes(this.pendingRecipes);  // Met à jour les recettes dans le service
      }
      this.editMode = false;
      this.recipeToEdit = null;  // Reset après l'édition
    } else {
      // Ajouter une nouvelle recette
      this.recipeService.addRecipe(recipe);
    }
    this.resetForm();
  }

  // Méthode pour entrer en mode édition
  editRecipe(recipeId: number): void {
    const recipe = this.pendingRecipes.find(r => r.id === recipeId);
    if (recipe) {
      this.nouvelleRecette = { ...recipe };  // Remplir le formulaire avec les données existantes
      this.editMode = true;
      this.recipeToEdit = recipe;
    }
  }

  // Méthode pour supprimer une recette
  deleteRecipe(recipeId: number): void {
    const updatedRecipes = this.pendingRecipes.filter(recipe => recipe.id !== recipeId);
    this.pendingRecipes = updatedRecipes;
    this.recipeService.setRecipes(updatedRecipes);  // Met à jour les recettes dans le service
    console.log(`Deleted recipe with id: ${recipeId}`);
  }

  // Méthode pour réinitialiser le formulaire après l'ajout ou l'édition
  resetForm(): void {
    this.nouvelleRecette = {
      id: 0,
      name: '',
      portion: 0,
      image_url: '',
      prep_time: '',
      cook_time: '',
      category: '',
      description: '',
    };
  }
}
