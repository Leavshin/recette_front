import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../utils/services/user.service';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent {
  constructor(private userService: UserService) {}

  addToFavorites(recipeId: string): void {
    const userId = 'current-user-id'; // À remplacer par la vraie logique d'obtention de l'ID utilisateur
    this.userService.addFavoriteRecipe(userId, recipeId).subscribe({
      next: () => {
        console.log(`Recipe ${recipeId} added to favorites`);
        // Ajouter ici une notification à l'utilisateur
      },
      error: (error) => {
        console.error('Error adding recipe to favorites', error);
        // Ajouter ici une gestion d'erreur pour l'utilisateur
      }
    });
  }
}
