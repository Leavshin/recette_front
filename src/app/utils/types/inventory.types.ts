import {Ingredient} from "./ingredient.types";
import { User } from "./user.types";


export type Inventory={
  quantity: number;
  ingredient: Ingredient;
  account: User;

}
