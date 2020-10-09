import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

interface AuthResponseData{
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService{
    user = new BehaviorSubject<User>(null);
    private tokenExpirationTimer: any;

    constructor(private http: HttpClient, private router: Router){}

    signUp(email: string, password: string){
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDDvkJbGN_Af0XNbZ36jfvYqy17i7Z85_A',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        )
        .pipe(catchError(this.handleError), tap(resData => {
            this.handleAuthentication(resData);
        }));
    }

    signIn(email: string, password: string){
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDDvkJbGN_Af0XNbZ36jfvYqy17i7Z85_A',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        )
        .pipe(catchError(this.handleError), tap(resData => {
            this.handleAuthentication(resData);
        }));
    }

    autoSignIn(){
        const userData: {
            email: string,
            userId: string,
            _token: string,
            _tokenExpirationDate: string
        } = JSON.parse(localStorage.getItem('userData'));
        if(!userData){
            return;
        }
        const loadedUser = new User(userData.email, userData.userId, userData._token, new Date(userData._tokenExpirationDate));

        if(loadedUser.token)
        {
            this.user.next(loadedUser);
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
        }
    }

    logout(goToHomePage?: boolean){
        this.user.next(null);
        if(goToHomePage){
            this.router.navigate(['/paycarz/home']);
        }
        else{
            this.router.navigate(['/paycarz/app-signin-form']);
        }
        localStorage.removeItem('userData');
        if(this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }

    autoLogout(expirationDuration: number){
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration);
    }

    private handleError(errorRes: HttpErrorResponse){
        let errorMessage = "An unknown error occurred!";
        if(!errorRes.error || !errorRes.error.error)
        {
            return throwError(errorMessage);
        }
        switch(errorRes.error.error.message)
        {
            case 'EMAIL_EXISTS':
                errorMessage = "The email you entered already exists!";
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = "This email does not exists!";
                break; 
            case 'INVALID_PASSWORD':
                errorMessage = "Password is invalid!"; 
                break;      
        }
        return throwError(errorMessage);
    }

    private handleAuthentication(resData: AuthResponseData){
        const expirationDate = new Date(new Date().getTime() +  +resData.expiresIn*1000);
        const user = new User(resData.email, resData.localId, resData.idToken, expirationDate);
        this.user.next(user);
        this.autoLogout(+resData.expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user));
    }

}