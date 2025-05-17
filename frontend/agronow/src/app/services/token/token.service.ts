import { Injectable } from '@angular/core';
import { distinctUntilChanged, interval, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  variableName = 'token';
  pollIntervalMs = 1000;

  set token(token: string) {
    localStorage.setItem(this.variableName, token);
  }

  get token() {
    return localStorage.getItem(this.variableName) as string;
  }

  isAlreadyLoggedIn(): boolean {
    const token = this.token;
    return token !== null;
  }

  reset() {
    localStorage.clear();
  }

  watchLoggedStatus(): Observable<string | null> {
    return interval(this.pollIntervalMs).pipe(
      map(() => localStorage.getItem(this.variableName)),
      distinctUntilChanged()
    );
  }
}
