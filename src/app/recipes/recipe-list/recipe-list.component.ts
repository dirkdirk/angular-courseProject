import { Component, OnInit, Output, EventEmitter } from '@angular/core'

import { Recipe } from '../recipe.model'

@Component({
    selector: 'app-recipe-list',
    templateUrl: './recipe-list.component.html',
    styleUrls: ['./recipe-list.component.css']
})

export class RecipeListComponent implements OnInit {

    @Output() recipeWasSelected = new EventEmitter<Recipe>()

    recipes: Recipe[] = [
        new Recipe('Test Recipe',
                   'This is a test ...',
                   'https://c.pxhere.com/images/d0/54/15a09b734bfd3e341434c2191a94-1417896.jpg!d'),
        new Recipe('Test Recipe 2',
                   'This is a test 2 ...',
                   'https://c.pxhere.com/images/d0/54/15a09b734bfd3e341434c2191a94-1417896.jpg!d')
    ]

    onRecipeSelected(recipe: Recipe) {
        this.recipeWasSelected.emit(recipe)
    }

    constructor() { }

    ngOnInit(): void {
    }

}

