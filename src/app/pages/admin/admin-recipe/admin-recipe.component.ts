// @ts-ignore
import { Component, OnInit } from '@angular/core';
// @ts-ignore
import { CommonModule } from '@angular/common';
// @ts-ignore
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Recipe } from '../../../utils/types/recipe.types';
import {EnumService} from "../../../utils/services/enum.service";
import {RecipeService} from "../../../utils/services/recipe.service";
import {Ingredient} from "../../../utils/types/ingredient.types";
import {IngredientService} from "../../../utils/services/ingredient.service";

// @ts-ignore
// @ts-ignore
@Component({
  selector: 'app-admin-recipe',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './admin-recipe.component.html',
  styleUrls: ['./admin-recipe.component.css']
})
export class AdminRecipeComponent implements OnInit {
  // pendingRecipes: Recipe[] = [];
  recipe_categories: string[] = [];
  ingredientsList: Ingredient[] = [];
  recipes: Recipe[] = [];

  recipeForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    portion: new FormControl(2, [Validators.required]),
    imageUrl: new FormControl(''),
    prepTime: new FormControl('', [Validators.required]),
    cookTime: new FormControl('', [Validators.required]),
    category: new FormControl(),
    ingredients: new FormArray([
      new FormGroup({
        ingredient: new FormControl(),
        quantity: new FormControl(1, [Validators.required]),
      }),
    ]),
    instructions: new FormArray([
      new FormGroup({
        step: new FormControl(1, [Validators.required]),
        description: new FormControl('', [Validators.required]),
      })
    ])
  })


  // editMode: boolean = false;  // Flag pour savoir si l'on est en mode édition
  // recipeToEdit: Recipe | null = null;  // Pour stocker la recette à modifier

  constructor(private recipeService: RecipeService, private enumService: EnumService, private ingredientService: IngredientService) {}

  ngOnInit(): void {
    // this.loadPendingRecipes();
    this.enumService.getRecipeCategory().subscribe(
      (data: string[]) => {
        this.recipe_categories = data;
      },
        (error: any) => {
        console.error('Erreur dans la récupération de l\'énum recipe_category', error);
      }
    )
    this.getIngredients();
    this.getRecipes();
  }

  getIngredients(): void {
    this.ingredientService.getAllIngredients().subscribe((data: Ingredient[]) => {
      this.ingredientsList = data;
    })
  }

  getRecipes(): void{
    this.recipeService.getAllRecipe().subscribe((data: Recipe[]) => {
      this.recipes = data;
    })
  }

  get ingredients() {
    return this.recipeForm.controls.ingredients;
  }

  get instructions(){
    return this.recipeForm.controls.instructions;
  }

  addIngredient(){
    this.ingredients.push(new FormGroup({
      ingredient: new FormControl('', [Validators.required]),
      quantity: new FormControl(1, [Validators.required]),
    }))
  }

  addInstruction(){
    this.instructions.push(new FormGroup({
      step: new FormControl(1, [Validators.required]),
      description: new FormControl('', [Validators.required]),
    }))
  }

  // loadPendingRecipes(): void {
  //   this.recipeService.getRecipes().subscribe({
  //     next: (recipes: Recipe[]) => this.pendingRecipes = recipes,
  //     error: (error: any) => console.error('Error fetching pending recipes', error)
  //   });
  // }

  // viewRecipe(recipeId: number): void {
  //   // Implémentez la logique pour afficher la recette
  //   console.log(`Viewing recipe with id: ${recipeId}`);
  // }

  addRecipe(): void {
    // if (this.editMode && this.recipeToEdit) {
    //   // Si nous sommes en mode édition, met à jour la recette existante
    //   const index = this.pendingRecipes.findIndex(r => r.id === this.recipeToEdit?.id);
    //   if (index !== -1) {
    //     this.pendingRecipes[index] = { ...recipe, id: this.recipeToEdit.id };
    //     this.recipeService.setRecipes(this.pendingRecipes);  // Met à jour les recettes dans le service
    //   }
    //   this.editMode = false;
    //   this.recipeToEdit = null;  // Reset après l'édition
    // } else {
      // Ajouter une nouvelle recette
      if(this.recipeForm.valid){
        console.log(this.recipeForm.value);
        this.recipeService.addRecipe(this.recipeForm.value as Recipe).subscribe();
        this.recipeForm.reset();
      }
  //  }
  }

  // // Méthode pour entrer en mode édition
  // editRecipe(recipeId: number): void {
  //   const recipe = this.pendingRecipes.find(r => r.id === recipeId);
  //   if (recipe) {
  //     this.nouvelleRecette = { ...recipe };  // Remplir le formulaire avec les données existantes
  //     this.editMode = true;
  //     this.recipeToEdit = recipe;
  //   }
  // }
  //

  // Méthode pour supprimer une recette
  deleteRecipe(recipeId: number): void {
    this.recipeService.deleteRecipe(recipeId);
  }


}
