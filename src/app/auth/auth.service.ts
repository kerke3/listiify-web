import { Subject } from 'rxjs';
import { AuthData } from './auth-data.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UIService } from '../ui.service';

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private isAuthenticated = false;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private snackbar: MatSnackBar,
    private uiService: UIService
  ) {}

  login(authData: AuthData) {
    this.afAuth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        console.log(result);
        this.authSuccessfully();
        this.router.navigate(['/users']);
      })
      .catch((error) => {
        this.uiService.loadingStateChanged.next(false);
        this.snackbar.open(error.message, null, {
          duration: 3000,
        });
      });
  }

  logout() {
    this.authChange.next(false);
    this.router.navigate(['/']);
    this.isAuthenticated = false;
  }

  private authSuccessfully() {
    this.isAuthenticated = true;
    this.authChange.next(true);
  }

  isAuth() {
    return this.isAuthenticated;
  }
}
