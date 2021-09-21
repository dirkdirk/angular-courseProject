import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { exhaustMap, map, take, tap } from 'rxjs/operators'

import { Recipe } from '../recipes/recipe.model'

import { RecipeService } from './recipe.service'
import { AuthService } from '../auth/auth.service'

@Injectable({
    providedIn: 'root'
})
export class DataStorageService {

    fbRootURL     = 'https://ngcourse-b9680-default-rtdb.firebaseio.com/'
    fbRecipesNode = 'recipes.json'
    fbRecipesURL  = this.fbRootURL + this.fbRecipesNode

    constructor(
        private http: HttpClient,
        private recipeService: RecipeService,
        private authService: AuthService
    ) { }

    storeRecipes() {
        const recipes = this.recipeService.getRecipes()
        this.http
        .put(
            this.fbRecipesURL,
            recipes
        )
        .subscribe(response => {
            console.log(`response: ${response}`)
            console.log(response)
        })
    }

    fetchRecipes() {
        return this.http
        .get<Recipe[]>(
            this.fbRecipesURL
        )
        .pipe(
            map(recipes => {
                return recipes.map( (recipe: Recipe) => {
                    return {
                        ...recipe,
                        ingredients: recipe.ingredients ? recipe.ingredients : []
                    }
                })
            }),
            tap(recipes => {
                this.recipeService.setRecipes(recipes)
            })
        )
    }

}
