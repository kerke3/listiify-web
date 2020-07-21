import { User } from './user.model';
import { Subject } from 'rxjs';
import { AuthData } from './auth-data.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private user: User;

  constructor(private router: Router) {}

  login(authData: AuthData) {
    this.user = {
      email: authData.email,
    };
    this.authChange.next(true);
    this.router.navigate(['/users']);
  }

  logout() {
    this.user = null;
    this.authChange.next(false);
    this.router.navigate(['/']);
  }
  getUser() {
    return { ...this.user };
  }

  isAuth() {
    return this.user != null;
  }
}
