import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
// import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  message = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    // private authentication: AuthenticationService,
    private auth: AuthService,
  ) { }

  ngOnInit() {
  }

  signIn(email: any, password: any) {
    // return this.auth.signIn(email, password);
  }

}
