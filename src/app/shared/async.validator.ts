import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AbstractControl, AsyncValidatorFn} from '@angular/forms';
import {Observable, timer} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {server} from "../url.service";



@Injectable({
    providedIn: 'root'
})
export class AsyncValidator {
    constructor(private http: HttpClient) {}

    searchEmailLogin(text) {
        return timer(300)
            .pipe(
                switchMap(() => {

                    // return this.http.get(`${server}/forLogin?email=${text}&telephone=${text}`)
                    return this.http.get(`${server}/forLogin?email=${text}&telephone=%2B${text.slice(1)}`)
                })
            );
    }


    loginEmailValidator(): AsyncValidatorFn {
        return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
            // console.log(control);
            return this.searchEmailLogin(control.value)
                .pipe(
                    map(res => {
                        // if username is already taken
                        if (res['success'] === true) {
                            // return error
                            return {'emailExists': true};
                        }
                    })
                );
        };

    }

    registerEmailPhoneValidator(): AsyncValidatorFn {
        return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
            return this.searchEmailLogin(control.value)
                .pipe(
                    map(res => {
                        // if username is already taken
                        if (res['success'] === false) {
                            console.log("wrong")
                            // return error
                            return {'Exists': true};
                        }
                    })
                );
        };

    }
}
