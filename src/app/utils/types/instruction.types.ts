import {Recipe} from "./recipe.types";

export type Instruction = {
    id: number;
    recipe: Recipe;
    step: number;
    description: string;
}
