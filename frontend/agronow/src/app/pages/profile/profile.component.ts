import { Component } from '@angular/core';
import { TokenService } from '../../services/token/token.service';
import {NgIf} from '@angular/common';
import { UserService } from '../../services/services/user.service';
import {UserResponse} from '../../services/models/user-response';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-profile',
  imports: [
    NgIf,
    TranslatePipe
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  testId = 1;
  profileData : UserResponse | undefined = undefined;

  constructor(
    public tokenService: TokenService,
    private userService: UserService,
  ) {
    this.getProfileData();
  }

  getProfileData() {
    this.userService.getUser({
      id: this.testId
    })
      .subscribe({
        next: (data) => {
          console.log(data);
          this.profileData = data;
        },
        error: (err) => {
          console.log(err);
        }
      })
  }

  protected readonly JSON = JSON;
}
