import { Component, OnInit, Output, EventEmitter } from '@angular/core'

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    @Output() onMenuItemClicked = new EventEmitter<string>()

    onShoppingClicked() {
        // console.log('--> header.component.ts onShoppingClicked()')
        this.onMenuItemClicked.emit('shopping')
    }

    onRecipesClicked() {
        // console.log('--> header.component.ts onRecipesClicked()')
        this.onMenuItemClicked.emit('recipes')
    }

    constructor() { }

    ngOnInit(): void {
    }

}

