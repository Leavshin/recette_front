import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../../utils/services/user.service';
import { Recipe } from '../../utils/types/recipe.types';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
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
      error: (error) => console.error('Error fetching favorite recipes', error)
    });
  }

   viewRecipe(recipeId: number): void {
   this.router.navigate([`${this.apiUrl}${recipeId}`, recipeId]);
  }

  removeFavorite(recipeId: number): void { // Recipe ID de type number
    this.userService.removeFavoriteRecipe(this.userId, recipeId).subscribe({
      next: () => {
        alert(`La recette ${recipeId} a été retirée de vos favoris`);
        this.loadFavoriteRecipes(); 
      },
      error: (error) => console.error('Error removing recipe from favorites', error)
    });
  }
}