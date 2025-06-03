import { Component, OnDestroy, OnInit } from '@angular/core';
import { TokenService } from '../../services/token/token.service';
import { NgIf } from '@angular/common';
import { UserService } from '../../services/services/user.service';
import { UserResponse } from '../../services/models/user-response';
import { TranslatePipe } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-profile',
  imports: [
    NgIf,
    TranslatePipe,
    FormsModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit, OnDestroy {

  userId = 0;
  profileData : UserResponse | undefined = undefined;
  profileSub: Subscription | undefined;

  constructor(
    public tokenService: TokenService,
    private userService: UserService,
  ) {

  }

  ngOnInit(): void {
    this.userId = this.tokenService.id;
    this.getProfileData();
  }

  ngOnDestroy(): void {
    if (this.profileSub !== undefined) {
      this.profileSub.unsubscribe();
      console.log(`profileSub unsubscribed`);
    }
  }

  getProfileData() {
    this.profileSub = this.userService.getUser({
      id: this.userId
    }).subscribe({
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
