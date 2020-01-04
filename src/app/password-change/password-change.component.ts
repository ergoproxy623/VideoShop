import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpService} from "../services/http.service";
import {passwordPattern} from "../url.service";

@Component({
    selector: 'app-password-change',
    templateUrl: './password-change.component.html',
    styleUrls: ['./password-change.component.css']
})
export class PasswordChangeComponent implements OnInit {

    constructor(public http : HttpService) {}

    hideOld = true;
    hideNew = true;
    hideRepeat = true;

    changePass = new FormGroup(
        {
            oldPass: new FormControl('', [Validators.required, Validators.minLength(6)]),
            newPass: new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern(passwordPattern)]),
            repeatPass: new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern(passwordPattern)])
        }
    );



    ngOnInit() {
    }

}
