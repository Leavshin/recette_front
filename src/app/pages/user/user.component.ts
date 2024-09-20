import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../../utils/services/user.service';
import { Recipe } from '../../utils/types/recipe.types';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { FormsModule } from '@angular/forms';
import { User } from '../../utils/types/user.types';
import { AuthService } from '../../utils/services/auth.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {


  favoriteRecipes: Recipe[] = [];

  user: User = {


  }


  constructor(
    private userService: UserService,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadFavoriteRecipes();
    this.loadUserProfile();
    this.authService.
  }

  loadUserProfile(): void {
    this.userService.getUser(this.user.id).subscribe({
      next: (userData) => this.user = userData,
      error: (error) => alert('Error fetching user profile')
    });
  }

  loadFavoriteRecipes(): void {
    this.userService.getFavoriteRecipes(this.user.id).subscribe({
      next: (recipes) => (this.favoriteRecipes = recipes),
      error: (error) => alert('Error fetching favorite recipes')
    });
  }

  viewRecipe(recipeId: number): void {
    this.router.navigate(['/recipe', recipeId]);
  }

  removeFavorite(recipeId: number): void {
    this.userService.removeFavoriteRecipe(this.user.id, recipeId).subscribe({
      next: () => {
        alert(`La recette ${recipeId} a été retirée de vos favoris`);
        this.loadFavoriteRecipes();
      },
      error: (error) => alert('Error removing recipe from favorites')
    });
  }

  onSubmit(): void {
    this.userService.updateUser(this.userId, this.user).subscribe({
      next: (updatedUser) => {
        this.user = updatedUser;
        alert('Profil mis à jour avec succès');
      },
      error: (error) => console.error('Error updating profile', error)
    });
  }
}
