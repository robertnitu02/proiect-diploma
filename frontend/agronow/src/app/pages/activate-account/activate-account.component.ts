import { Component } from '@angular/core';
import {AuthenticationService} from '../../services/services/authentication.service';
import { Router } from '@angular/router';
import {NgIf} from '@angular/common';
import {CodeInputModule} from 'angular-code-input';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-activate-account',
  imports: [
    NgIf,
    CodeInputModule,
    TranslatePipe
  ],
  templateUrl: './activate-account.component.html',
  styleUrl: './activate-account.component.scss'
})
export class ActivateAccountComponent {

  message = '';
  isOkay = true;
  submitted = false;

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {

  }

  onCodeCompleted(token: string) {
    this.confirmAccount(token);
  }

  goToLogin() {
    this.router.navigate(['login']);
  }

  private confirmAccount(token: string) {
    this.authService.confirm({
      token
    }).subscribe({
      next: () => {
        this.message = 'login-and-register.activate-successfully';
        this.submitted = true;
        this.isOkay = true;
      },
      error: () => {
        this.message = 'login-and-register.activate-bad';
        this.submitted = true;
        this.isOkay = false;
      }
    });
  }
}
