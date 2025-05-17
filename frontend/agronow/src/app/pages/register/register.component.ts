import { Component } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrationRequest } from '../../services/models/registration-request';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/services/authentication.service';
import { TokenService } from '../../services/token/token.service';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  imports: [
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    FormsModule,
    TranslatePipe
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private tokenService: TokenService
  ) {
  }

  registerRequest: RegistrationRequest = {};
  errorMessages: Array<string> = [];

  register() {
    this.errorMessages = [];
    this.authService.register({
      body: this.registerRequest
    }).subscribe({
      next: (res: RegistrationRequest) => {
        console.log(res);
        this.router.navigate(['activate-account']);
      },
      error: err => {
        console.log(JSON.stringify(err));
        if (err.error.validationErrors) {
          this.errorMessages = err.error.validationErrors;
        } else {
          this.errorMessages.push(err.error.error);
        }
      }
    });
  }

  goToLogin() {
    this.router.navigate(['login']);
  }

  isAlreadyLoggedIn(): boolean {
    return this.tokenService.isAlreadyLoggedIn();
  }
}
