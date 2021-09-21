import { Component, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'

import { AuthService } from '../auth/auth.service'
import { DataStorageService } from '../services/data-storage.service'

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy {
    private userSubcription: Subscription
    isAuthenticated = false

    constructor(
        private dataStorageService: DataStorageService,
        private authService: AuthService
    ) {}

    ngOnInit() {
        this.userSubcription = this.authService.user.subscribe(user => {
            // this.isAuthenticated = !user ? false : true  // same as line below
            this.isAuthenticated = !!user
        })
    }

    onLogout() {
        this.authService.logout()
    }

    onSaveData() {
        this.dataStorageService.storeRecipes()
    }

    onFetchData() {
        this.dataStorageService.fetchRecipes().subscribe()
    }

    ngOnDestroy() {
        this.userSubcription.unsubscribe()
    }

}

