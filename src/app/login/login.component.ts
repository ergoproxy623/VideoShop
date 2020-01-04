import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {HttpService} from "../services/http.service";
import {FbLoginComponent} from "../fb-login/fb-login.component";
// import {MatIconModule} from '@angular/material/icon';
import {AsyncValidator} from "../shared/async.validator";




@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})



export class LoginComponent implements OnInit {

    public form;

    constructor(public http: HttpService, public fb: FbLoginComponent, private asyncValid : AsyncValidator) {}

    loginData = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email], this.asyncValid.loginEmailValidator()),
        password: new FormControl('', [Validators.required, Validators.minLength(6)],)
    });

    hide = true;

    ngOnInit() {}

}
