import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { UserService } from '../../utils/services/user.service';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../../utils/types/recipe.types';

@Component({
  selector: 'app-favorite-recipe',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './favorite-recipe.component.html',
  styleUrl: './favorite-recipe.component.css'
})
export class FavoriteRecipeComponent implements OnInit {
  favoriteRecipes: Recipe[] = [];
  userId = 1;
  private apiUrl = environment.apiUrl + '/recipe/';

  constructor(private userService: UserService, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.loadFavoriteRecipes();
  }

  loadFavoriteRecipes(): void {
    this.userService.getFavoriteRecipes(this.userId).subscribe({
      next: (recipes) => (this.favoriteRecipes = recipes),
      error: (error) => alert('Erreur lors du chargement')
    });
  }

   viewRecipe(recipeId: number): void {
   this.router.navigate([`${this.apiUrl}${recipeId}, recipeId`]);
  }

  removeFavorite(recipeId: number): void {
    this.userService.removeFavoriteRecipe(this.userId, recipeId).subscribe({
      next: () => {
        alert(`La recette ${recipeId} a été retirée de vos favoris`);
        this.loadFavoriteRecipes();
      },
      error: (error) => console.error('Error removing recipe from favorites', error)
    });
  }
}
