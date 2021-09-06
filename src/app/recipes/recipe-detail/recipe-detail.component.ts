import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'

import { Recipe } from '../recipe.model'
import { RecipeService } from '../../services/recipe.service'

@Component({
	selector: 'app-recipe-detail',
	templateUrl: './recipe-detail.component.html',
	styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

	constructor(private recipeService: RecipeService,
		private route: ActivatedRoute) { }

	ngOnInit(): void {
		// const id = this.route.snapshot.params['id']
		this.route.params.subscribe((params: Params) => {
			this.id = params['id']
		})
	}

	id: number

	onAddToShoppingList() {
		this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients)
	}

}

