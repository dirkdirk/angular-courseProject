import { Component, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms'
import { Router } from '@angular/router'
import { Observable } from 'rxjs'

import { AuthResponseData, AuthService } from './auth.service'

@Component({
    selector:    'app-auth',
    templateUrl: './auth.component.html',
    styleUrls:   ['./auth.component.css']
})
export class AuthComponent implements OnInit {
    isLoginMode  = true
    isLoading    = false
    errorMessage = ''

    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    ngOnInit(): void { }

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode
    }

    onSubmit(authForm: NgForm) {
        console.log('--> auth.component.ts -- onSubmit()')
        console.log('authForm.value')
        console.log(authForm.value)
        if (!authForm.valid) { return }
        const email = authForm.value.email
        const pw    = authForm.value.password

        let authObs: Observable<AuthResponseData>

        this.isLoading = true

        if (this.isLoginMode) {
            authObs = this.authService.login(email, pw)
        } else {
            authObs = this.authService.signup(email, pw)
        }

        authObs.subscribe(
            responseData => {
                console.log('responseData')
                console.log(responseData)
                this.isLoading = false
                this.router.navigate(['/recipes'])
            },
            errorResponse => {
                console.log('--> authForm.component.ts -- authObs.subscribe()')
                console.log(`errorResponse: ${errorResponse}`)
                this.errorMessage = errorResponse
                this.isLoading = false
            }
        )

        authForm.reset()
    }

}
