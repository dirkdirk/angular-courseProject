import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
import { Ingredient } from '../shared/ingredient.model'

@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html',
    styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

    ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10)
    ]

    addIngredient(newIngredient: { name: string, amount: number }) {
        // console.log('--> shopping-list-component.ts addIngredient() listener')
        // console.log(`newIngredient.name: ${newIngredient.name}`)
        this.ingredients.push(new Ingredient(newIngredient.name, newIngredient.amount))
        // console.log('this.ingredients:')
        // console.log(this.ingredients)
    }

    constructor() { }

    ngOnInit(): void {
    }

}
