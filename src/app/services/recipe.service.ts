import { Injectable, EventEmitter } from '@angular/core'

import { Recipe }              from '../recipes/recipe.model'
import { Ingredient }          from '../shared/ingredient.model'
import { ShoppingListService } from '../services/shopping-list.service'

@Injectable({
    providedIn: 'root'
})
export class RecipeService {

    constructor(private slService: ShoppingListService) {}

    recipeSelected = new EventEmitter<Recipe>()

    private recipes: Recipe[] = [
        new Recipe('Schnitzel',
                   'Yum yum yummy!',
                   'https://c.pxhere.com/images/d0/54/15a09b734bfd3e341434c2191a94-1417896.jpg!d',
                    [
                        new Ingredient('Meat', 1),
                        new Ingredient('Fries', 20)
                    ]),
        new Recipe('Big Fat Burger',
                   'Heart Attack City',
                   'https://c.pxhere.com/images/d0/54/15a09b734bfd3e341434c2191a94-1417896.jpg!d',
                    [
                        new Ingredient('Buns', 2),
                        new Ingredient('Meat', 1)
                    ])
    ]

    getRecipes() {
        return this.recipes.slice()
    }

    getRecipe(index: number) {
        return this.recipes[index]
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients)
    }

}
