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



}
