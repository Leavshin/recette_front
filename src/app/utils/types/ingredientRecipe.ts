import {Ingredient} from "./ingredient.types";
import {Recipe} from "./recipe.types";

export type IngredientRecipe = {
  quantity: number;
  ingredient: Ingredient;
  Recipe: Recipe;
}
