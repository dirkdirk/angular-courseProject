import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Params, Router } from '@angular/router'

import { Recipe } from '../recipe.model'
import { RecipeService } from '../../services/recipe.service'

@Component({
	selector: 'app-recipe-detail',
	templateUrl: './recipe-detail.component.html',
	styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
    id:     number
    recipe: Recipe


	constructor(
        private recipeService: RecipeService,
        private router:        Router,
        private route:         ActivatedRoute
    ) { }

	ngOnInit(): void {
		// const id = this.route.snapshot.params['id']
		this.route.params.subscribe((params: Params) => {
			this.id = +params['id']
            this.recipe = this.recipeService.getRecipe(this.id)
		})
	}

	onAddToShoppingList() {
		this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients)
	}

    onDeleteRecipe() {
        this.recipeService.deleteRecipe(this.id)
        this.router.navigate(['/recipes'])
    }

}

