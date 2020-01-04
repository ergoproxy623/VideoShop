import {Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service'
import {Router} from '@angular/router';
import {FbLoginComponent} from "../fb-login/fb-login.component";
import {ToastrService} from 'ngx-toastr';
import {ErrorStateMatcher} from "@angular/material";
import {AsyncValidator} from "../shared/async.validator";
import {TranslateService} from "@ngx-translate/core";
import{namePattern, passwordPattern, telephonePattern} from "../url.service";

export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {

        if (form['directives'][4].touched && form['directives'][5].touched && form.hasError('notSame')) {
            console.log("not the same");
            return true;
        }

        if (form['directives'][5].touched && form['directives'][5].hasError('required')){
            return true;
        }


    }
}

@Component({
    selector: 'app-registration-form',
    templateUrl: './registration-form.component.html',
    styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {

    matcher = new MyErrorStateMatcher();

    username;
    surname;
    email;
    telephone;
    password;
    passRepeat;


    hide = true;
    hideRepeat = true;



    signupForm = new FormGroup({
        'username': new FormControl(null, [Validators.required, Validators.pattern(namePattern)]),
        'surname': new FormControl(null, [Validators.required, Validators.pattern(namePattern)]),
        'telephone': new FormControl(null, [Validators.required, Validators.pattern(telephonePattern)], this.asyncValid.registerEmailPhoneValidator()),
        'email': new FormControl(null, [Validators.required, Validators.email], this.asyncValid.registerEmailPhoneValidator()),
        'password': new FormControl(null, [Validators.required, Validators.minLength(6), Validators.pattern(passwordPattern)]),
        'password-repeat': new FormControl(null, [Validators.required, Validators.minLength(6)])
    }, this.passMatch);

    constructor(
        private asyncValid: AsyncValidator,
        private authService: AuthService,
        private router: Router,
        public fb: FbLoginComponent,
        private toastr: ToastrService,
        private translate: TranslateService) {
    }

    passMatch(group: FormGroup) { // here we have the 'passwords' group
        let pass = group.controls.password.value;
        let confirmPass = group.controls['password-repeat'].value;

        return pass === confirmPass ? null : {'notSame': true}
    }


    ngOnInit() {
        this.username = this.signupForm.get('username');
        this.surname = this.signupForm.get('surname');
        this.email = this.signupForm.get('email');
        this.telephone = this.signupForm.get('telephone');
        this.password = this.signupForm.get('password');
        this.passRepeat = this.signupForm.get('password-repeat');

    }


    onSubmit() {
        this.authService.signUp(this.signupForm.value)
            .subscribe((result) => {

                console.log(result);

                this.authService.setUser(result.user, result.token);

                let message = this.translate.instant("toastr.register");
                this.toastr.success(message);

                this.router.navigate(["/"]);
            }, (err) => {
                console.log(err);

            });
    }

}
