import { Component } from '@angular/core';
import { AuthenticationRequest } from '../../services/models/authentication-request';
import { NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/services/authentication.service';
import { AuthenticationResponse } from '../../services/models/authentication-response';
import { TokenService } from '../../services/token/token.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  imports: [
    NgIf,
    NgForOf,
    FormsModule,
    TranslatePipe
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  authRequest: AuthenticationRequest = { email: '', password: '' };
  errorMessages: Array<string> = [];

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    public tokenService: TokenService,
  ) {
  }

  login() {
    this.errorMessages = [];

    this.authService.authenticate({
      body: this.authRequest
    }).subscribe({
      next: (res: AuthenticationResponse) => {
        this.tokenService.token = res.token as string;
        if (res.id !== undefined)
          this.tokenService.id = +res.id;
        if (res.admin !== undefined)
          this.tokenService.admin = +res.admin;
        if (res.marketId !== undefined)
          this.tokenService.market = +res.marketId;
        if (res.stallId !== undefined)
          this.tokenService.stall = +res.stallId;

        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 1000);
      },
      error: (err) => {
        console.log(JSON.stringify(err));
        if (err.error.validationErrors) {
          this.errorMessages = err.error.validationErrors;
        } else {
          this.errorMessages.push(err.error.error);
        }
      }
    });
  }

  register() {
    this.router.navigate(['register']);
  }
}
