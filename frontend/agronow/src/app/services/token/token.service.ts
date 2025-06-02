import { Injectable } from '@angular/core';
import { distinctUntilChanged, interval, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  variableName = 'token';
  pollIntervalMs = 1000;

  variableIdName = 'id';

  adminVariableName = 'admin';
  marketVariableName = 'market';
  stallVariableName = 'stall';

  set token(token: string) {
    localStorage.setItem(this.variableName, token);
  }

  get token() {
    return localStorage.getItem(this.variableName) as string;
  }

  set id(id: number) {
    localStorage.setItem(this.variableIdName, id.toString());
  }

  get id() {
    const idData = localStorage.getItem(this.variableIdName) as string;
    return +idData;
  }

  set admin(admin: number) {
    localStorage.setItem(this.adminVariableName, admin.toString());
  }

  get admin() {
    const adminValue = localStorage.getItem(this.adminVariableName) as string;
    return +adminValue;
  }

  set market(market: number) {
    localStorage.setItem(this.marketVariableName, market.toString());
  }

  get market() {
    const marketOwnerValue = localStorage.getItem(this.marketVariableName) as string;
    return +marketOwnerValue;
  }

  set stall(stall: number) {
    localStorage.setItem(this.stallVariableName, stall.toString());
  }

  get stall() {
    const stallOwnerValue = localStorage.getItem(this.stallVariableName) as string;
    return +stallOwnerValue;
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
