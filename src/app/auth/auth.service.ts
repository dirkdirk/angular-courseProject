import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'

import { BehaviorSubject, throwError } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'

import { User } from '../models/user.model'

export interface AuthResponseData {
    kind        : string;
    idToken     : string;
    email       : string;
    refreshToken: string;
    expiresIn   : string;
    localId     : string;
    registered? : boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    fbAPIkey    = 'AIzaSyC3Rx11qQiDw7R4t9PCjKL8ms-sLPEO1Lk'
    fbSignUpURL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.fbAPIkey}`
    fbEmailSignInURL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.fbAPIkey}`

    user = new BehaviorSubject<User>(null)
    tokenExpirationTimer: any

    constructor(
        private http: HttpClient,
        private router: Router
    ) {}

    signup(email: string, pw: string) {
        console.log('--> auth.service.ts -- signup()')
        return this.http
        .post<AuthResponseData>(
            this.fbSignUpURL,
            {
                email            : email,
                password         : pw,
                returnSecureToken: true
            }
        )
        .pipe(
            catchError(this.handleError),
            tap( responseData => { this.handleAuthentication(responseData) } )
        )
    }

    login(email:string, pw: string) {
        console.log('--> auth.service.ts -- login()')
        return this.http
        .post<AuthResponseData>(
            this.fbEmailSignInURL,
            {
                email            : email,
                password         : pw,
                returnSecureToken: true
            }
        )
        .pipe(
            catchError(this.handleError),
            tap( responseData => { this.handleAuthentication(responseData) } )
        )
    }

    autoLogin() {
        console.log('--> auth.service.ts -- autoLogin()')
        const userData: {
            email               : string;
            id                  : string;
            _token              : string;
            _tokenExpirationDate: string;
        } = JSON.parse( localStorage.getItem('userData') )

        if (!userData) { return }

        const tokenExDate        = new Date(userData._tokenExpirationDate)
        const tokenExDateMiliSec = tokenExDate.getTime()
        const nowMiliSec         = new Date().getTime()

        const loadedUser = new User(
            userData.email,
            userData.id,
            userData._token,
            tokenExDate
        )

        if (loadedUser.token) {
            this.user.next(loadedUser)
            const expirationDuration = tokenExDateMiliSec - nowMiliSec
            this.autoLogout(expirationDuration)
        }

    }

    logout() {
        this.user.next(null)
        this.router.navigate(['/auth'])
        localStorage.removeItem('userData')
        if (this.tokenExpirationTimer) clearTimeout(this.tokenExpirationTimer)
        this.tokenExpirationTimer = null
    }

    autoLogout(expirationDuration: number) {
        console.log('--> auth.service.ts -- autoLogout()')
        console.log(`expirationDuration: ${expirationDuration}`)
        this.tokenExpirationTimer = setTimeout(() => this.logout(), expirationDuration)
    }

    private handleAuthentication(responseData: AuthResponseData) {
        console.log('--> auth.service.ts -- handleAuthentication()')
        const expiresInMiliSec = +responseData.expiresIn * 1000
        const expirationDate = new Date(new Date().getTime() + expiresInMiliSec)
        const newUser = new User(
            responseData.email,
            responseData.localId,
            responseData.idToken,
            expirationDate
        )
        this.user.next(newUser)
        this.autoLogout(expiresInMiliSec)
        localStorage.setItem( 'userData', JSON.stringify(newUser) )
    }

    private handleError(errorResponse: HttpErrorResponse) {
        console.log('--> auth.service.ts -- handleError()')
        let errorMessage = 'An unknown error occurred'
        if (!errorResponse.error || !errorResponse.error.error || !errorResponse.error.error.message) {
            return throwError(errorMessage)
        }
        switch (errorResponse.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'The email address is already in use by another account.'
                break
            case 'OPERATION_NOT_ALLOWED':
                errorMessage = 'Password sign-in is disabled for this project.'
                break
            case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later.'
                break
            case 'INVALID_PASSWORD':
                errorMessage = 'The email or password are incorrect.'
                break
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'The email or password are incorrect.'
                break
        }
        return throwError(errorMessage)
}

}
