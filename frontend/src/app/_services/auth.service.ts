import { Injectable, NgZone } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { auth } from 'firebase';
import { IUser } from '../_models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;

  constructor(
    private ngFirestore: AngularFirestore,
    private ngFireAuth: AngularFireAuth,
    private router: Router,
    private ngZone: NgZone
  ) { }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  // Sign in with email and password
  signIn(email: any, password: any) {
    return this.ngFireAuth.auth.signInWithEmailAndPassword(email, password)
    .then( result => {
      this.ngZone.run(() => {
        this.router.navigate(['movies']);
      });
      this.setUserData(result.user);
    }).catch (error => {
      console.log(error.message);
    });
  }

  // Sign up with email and password
  signUp(email: any, password: any) {
    return this.ngFireAuth.auth.createUserWithEmailAndPassword(email, password)
    .then( result => {
      this.sendVerifcationMail();
      this.setUserData(result.user);
    }).catch( error => {
      console.log(error.message);
    });
  }

  // Send verification mail to user
  sendVerifcationMail() {
    return this.ngFireAuth.auth.currentUser.sendEmailVerification()
    .then(() => this.router.navigate(['verify-email']));
  }

  // Reset forgotten password
  resetPassword(userEmail: any) {
    return this.ngFireAuth.auth.sendPasswordResetEmail(userEmail)
    .then(() => {
      alert('Password reset link has been sent to your email address');
    }).catch(error => console.log(error));
  }

  // sign in with Google
  googleAuth() {
    return this.authLogic(new auth.GoogleAuthProvider());
  }

  // Auth logic for other auth providers
  authLogic(provider: any) {
    return this.ngFireAuth.auth.signInWithPopup(provider)
    .then( result => {
      this.ngZone.run(() => this.router.navigate(['movies']));
      this.setUserData(result.user);
    }).catch(error => console.log(error));
  }

  setUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.ngFirestore.doc(`users/${user.uid}`);
    const userData: IUser = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    };

    return userRef.set(userData, { merge: true });
  }

  // sign out user
  signOut() {
    return this.ngFireAuth.auth.signOut()
    .then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    });
  }
}
