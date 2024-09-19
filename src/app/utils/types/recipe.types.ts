import {IngredientRecipe} from "./ingredientRecipe";
import {Instruction} from "./instruction.types";

export type Recipe = {
    id: number;
    name: string;
    imageUrl?: string;
    prepTime: string;
    cookTime: string;
    description: string;
    portion: number;
    category: string;
    ingredients: IngredientRecipe[];
    instructions: Instruction[];
}
