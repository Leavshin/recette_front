import {Component, OnInit, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserService} from '../../utils/services/user.service';
import {RecipeService} from "../../utils/services/recipe.service";
import {ActivatedRoute} from '@angular/router';
import {Recipe} from "../../utils/types/recipe.types";


@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent implements OnInit{

  private route = inject(ActivatedRoute);

  constructor(private userService: UserService, private recipeService: RecipeService) {
  }

  id = 0;
  recipe: Recipe | undefined = undefined;
  ngOnInit(){
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    })
    this.getRecipeById();
  }

  getRecipeById(){
    this.recipeService.getRecipeById(this.id).subscribe((data: Recipe) => {
      this.recipe = data;
    })
  }

  // addToFavorites(recipeId: string): void {
  //   const userId = 'current-user-id'; // À remplacer par la vraie logique d'obtention de l'ID utilisateur
  //   this.userService.addFavoriteRecipe(userId, recipeId).subscribe({
  //     next: () => {
  //       console.log(`Recipe ${recipeId} added to favorites`);
  //       // Ajouter ici une notification à l'utilisateur
  //     },
  //     error: (error) => {
  //       console.error('Error adding recipe to favorites', error);
  //       // Ajouter ici une gestion d'erreur pour l'utilisateur
  //     }
  //   });
  // }


}
