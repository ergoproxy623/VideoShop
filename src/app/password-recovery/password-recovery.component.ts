import { Component, OnInit } from '@angular/core';
import {HttpService} from "../services/http.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AsyncValidator} from "../shared/async.validator";

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.css']
})
export class PasswordRecoveryComponent implements OnInit {

  constructor(public http : HttpService, private asyncValid : AsyncValidator) { }

  recoverPassword = new FormGroup(
      {email: new FormControl('', [Validators.required, Validators.email], this.asyncValid.loginEmailValidator())}
  );

  ngOnInit() {
  }

}
