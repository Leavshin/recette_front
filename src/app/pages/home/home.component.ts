import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserService} from '../../utils/services/user.service';
import {RecipeService} from '../../utils/services/recipe.service';
import {Recipe} from '../../utils/types/recipe.types';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  recipes: Recipe[] = [];

  constructor(
    private userService: UserService,
    private recipeService: RecipeService
  ) {
  }

  ngOnInit() {
    this.getRecipes()
  }

  getRecipes(): void {
    this.recipeService.getAllRecipe().subscribe((data: Recipe[]) => {
      this.recipes = data;
    })
  }

  // loadRecipes() {
  //   this.recipeService.getRecipes().subscribe({
  //     next: (recipes) => this.recipes = recipes,
  //     error: (error) => console.error('Error loading recipes', error)
  //   });
  }
