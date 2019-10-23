import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent2 implements OnInit {
  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(
    private afAuth: AngularFireAuth
  ) { }

  ngOnInit() {
  }
  async signIn() {
    try {
      const { email, password } = this.form.value
      await this.afAuth.auth.signInWithEmailAndPassword(email, password)
    } catch (err) {
      console.log(err)
    }
  }
}
