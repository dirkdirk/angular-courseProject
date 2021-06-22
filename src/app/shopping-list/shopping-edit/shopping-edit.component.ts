import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'

import { Ingredient } from '../../shared/ingredient.model'
import { ShoppingListService } from '../../services/shopping-list.service'

@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html',
    styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

    @ViewChild('amountInput', { static: true }) amountInput: ElementRef

    constructor(private slService: ShoppingListService) { }

    addIngredient(name: string) {
        const newIngredient = new Ingredient(name, this.amountInput.nativeElement.value)
        this.slService.addIngredient(newIngredient)
    }

    ngOnInit(): void {
    }

}
