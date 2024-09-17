import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../utils/services/user.service';
import { RecipeService } from '../../utils/services/recipe.service';
import { Recipe } from '../../utils/types/recipe.types';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  recipes: Recipe[] = [
    {
      id: 1,
      name: 'Ratatouille Provençale',
      portion: 1,
      image_url: 'assets/images/ratatouille.jpg',
      prep_time: 'Un plat végétarien coloré et savoureux, mêlant aubergines, courgettes, poivrons et tomates, parfumé aux herbes de Provence.',
      cook_time: '45',
      category: 'Facile',
      description: 'Un plat végétarien coloré et savoureux, mêlant aubergines, courgettes, poivrons et tomates, parfumé aux herbes de Provence.'
    },
    {
      id: 2,
      name: 'Ratatouille Provençale',
      portion: 1,
      image_url: 'assets/images/ratatouille.jpg',
      prep_time: 'Un plat végétarien coloré et savoureux, mêlant aubergines, courgettes, poivrons et tomates, parfumé aux herbes de Provence.',
      cook_time: '45',
      category: 'Facile',
      description: 'Un plat végétarien coloré et savoureux, mêlant aubergines, courgettes, poivrons et tomates, parfumé aux herbes de Provence.'
    },
  ];

  constructor(
    private userService: UserService,
    private recipeService: RecipeService
  ) {}

  ngOnInit() {
    // this.loadRecipes(); // Vous pouvez décommenter ceci si vous souhaitez charger les recettes depuis une API
  }

  loadRecipes() {
    this.recipeService.getRecipes().subscribe({
      next: (recipes) => this.recipes = recipes,
      error: (error) => console.error('Error loading recipes', error)
    });
  }

  addToFavorites(recipeId: number): void {
    const userId = 1; // À remplacer par la vraie logique d'obtention de l'ID utilisateur
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