import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Ingredient } from '../../utils/types/ingredient.types';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';
import { IngredientService } from '../../utils/services/ingredient.service';
import { UserService } from '../../utils/services/user.service';
import { Inventory } from '../../utils/types/inventory.types';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterLink],
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {


  inventoryForm = new FormGroup({
    ingredients: new FormArray([
      new FormGroup({
        ingredient: new FormControl(),
        quantity: new FormControl(1, [Validators.required]),
      }),
    ])
  });


  ingredientsList: Ingredient[] = [];



  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private ingredientService: IngredientService,
    private userService: UserService) {}

  ngOnInit() {

    this.getIngredients();
  }

  get ingredients(): FormArray {
    return this.inventoryForm.controls.ingredients;
  }

  addInventoryItem() {
    const inventoryItem = this.fb.group({
      ingredient: [null, Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
    });

    this.ingredients.push(inventoryItem);
  }





  getIngredients() {
    this.ingredientService.getAllIngredients().subscribe((data: Ingredient[]) => {
      this.ingredientsList = data;
    });
  }

  onSubmit() {
    if (this.inventoryForm.valid) {
      this.userService.addIngredient(this.inventoryForm.value as Inventory[]);
    } else {
      alert("Formulaire invalid");
    }
  }
}
