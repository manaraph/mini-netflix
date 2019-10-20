import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { auth } from 'firebase';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IUser } from '../_models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<IUser>;

  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router,
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap( user => {
        if (user) {
          return this.afs.doc<IUser>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
   }

   async googleSignin() {
     const provider = new auth.GoogleAuthProvider();
     const credential = await this.afAuth.auth.signInWithPopup(provider);
     return this.updateUserData(credential.user);
   }

   async siginOut() {
     await this.afAuth.auth.signOut();
     return this.router.navigate(['/']);
   }

  private updateUserData({ uid, email, displayName, photoURL }: IUser) {
    const userRef: AngularFirestoreDocument<IUser> = this.afs.doc(`users/${uid}`);

    const data: IUser = {
      uid,
      email,
      displayName,
      photoURL,
    };

    return userRef.set(data, { merge: true });
  }
}
