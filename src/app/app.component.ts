import { Component, Input } from '@angular/core'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'courseProject'

    menuSelected = 'recipes'

    @Input() menuItem: string

    menuItemClicked(menuItem: string) {
        console.log(`menuItem: ${menuItem}`)
        this.menuSelected = menuItem
    }

}
