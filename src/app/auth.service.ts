import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}
  afs = inject(AngularFireAuth);
  router = inject(Router);
  toastr = inject(ToastrService);
  signup(email: string, password: string) {
    return this.afs.createUserWithEmailAndPassword(email, password);
  }

  login(email: string, password: string) {
    return this.afs.signInWithEmailAndPassword(email, password);
  }
  loginWithpopup() {
    return this.afs.signInWithPopup(new GoogleAuthProvider());
  }

  forgotpassword(email: string) {
    return this.afs.sendPasswordResetEmail(email);
  }

  sendUserVerification(user: any) {
    user.sendEmailVerification().then(
      (res: any) => {
        this.router.navigateByUrl('/verify-email');
      },
      (err: any) => {
        this.toastr.error(
          'Something went wrong.Not able to send mail to your email.'
        );
      }
    );
  }

  logOut() {}
}
