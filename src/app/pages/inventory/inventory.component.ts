import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Ingredient } from '../../utils/types/ingredient.types';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';
import { IngredientService } from '../../utils/services/ingredient.service';
import { UserService } from '../../utils/services/user.service';
import { Inventory } from '../../utils/types/inventory.types';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  inventoryForm!: FormGroup;
  ingredientsList: Ingredient[] = [];


  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private ingredientService: IngredientService,
    private userService: UserService) {}

  ngOnInit() {
    this.inventoryForm = this.fb.group({
      inventoryItems: this.fb.array([]),
    });

    this.getIngredients();
  }

  get inventoryItems(): FormArray {
    return this.inventoryForm.get('inventoryItems') as FormArray;
  }

  addInventoryItem() {
    const inventoryItem = this.fb.group({
      ingredient: [null, Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
    });

    this.inventoryItems.push(inventoryItem);
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
