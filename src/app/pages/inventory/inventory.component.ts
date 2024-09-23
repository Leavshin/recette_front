
import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormGroup, FormArray, Validators, ReactiveFormsModule, FormControl} from '@angular/forms';
import { Ingredient } from '../../utils/types/ingredient.types';
import { CommonModule } from '@angular/common';
import { IngredientService } from '../../utils/services/ingredient.service';
import { UserService } from '../../utils/services/user.service';
import { Inventory } from '../../utils/types/inventory.types';
import {User} from "../../utils/types/user.types";
import {AuthService} from "../../utils/services/auth.service";
import {Recipe} from "../../utils/types/recipe.types";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterLink],
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit, OnDestroy {


  user$?: Subscription;
  user: User = {inventories: [], email: "", id: -1, name: ""};

  inventoryForm = new FormGroup({
      ingredients: new FormArray([
        new FormGroup({
          ingredient: new FormControl(),
          quantity: new FormControl(1, [Validators.required])
        }),
      ])
    });
  ingredientsList: Ingredient[] = [];


  constructor(
    private ingredientService: IngredientService,
    private userService: UserService,
    private authService: AuthService) {}

  ngOnInit() {

    this.authService.getUserInfo();
    if(this.authService.user.id) {
       this.user$ = this.userService.getUserById(this.authService.user.id).subscribe((data: User) => {
        this.user = data;
        this.getIngredients();
      });
    }
    console.log(this.user);

  }

  ngOnDestroy() {
    if(this.user$ !== undefined) {
      this.user$.unsubscribe();
    }
  }

  addIngredient(){
    this.ingredients.push(new FormGroup({
      ingredient: new FormControl('', [Validators.required]),
      quantity: new FormControl(1, [Validators.required]),
    }))

  }


  getIngredients() {
    this.ingredientService.getAllIngredients().subscribe((data: Ingredient[]) => {
      this.ingredientsList = data;
    });
  }

  get ingredients() {
    return this.inventoryForm.controls.ingredients;
  }

  onSubmit() {
    if (this.inventoryForm.valid) {
      let userInventory: Inventory[] = this.ingredients.value as Inventory[];
      for(let inventory of userInventory){
        inventory.account = this.user;
      }
      this.userService.addIngredient(userInventory).subscribe((data: Inventory[]) => {
        let newInventory: Inventory[] = [];
        for(let inventory of this.user.inventories){
          let found: Inventory | undefined = data.find((inv) => inv.ingredient.id === inventory.ingredient.id);
          if(found) {
            inventory.quantity += found.quantity;
          }
          newInventory.push(inventory);
        }
        this.user.inventories = newInventory;
      });
    } else {
      alert("Formulaire invalide");
    }
  }
}
