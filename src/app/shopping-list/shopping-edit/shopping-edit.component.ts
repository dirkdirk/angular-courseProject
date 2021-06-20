import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core'
import { Ingredient } from '../../shared/ingredient.model'

@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html',
    styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

    @Output() addIngredientEmitter = new EventEmitter<Ingredient>()
    @ViewChild('amountInput', { static: true }) amountInput: ElementRef

    addIngredient(name: string) {
        // console.log('--> shopping-edit-component.ts addIngredient()')
        // console.log(`name: ${name}`)
        const newIngredient = new Ingredient(name, this.amountInput.nativeElement.value)
        this.addIngredientEmitter.emit(newIngredient)
    }

    constructor() { }

    ngOnInit(): void {
    }

}
