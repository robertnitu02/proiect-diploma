import { Component, OnDestroy, OnInit } from '@angular/core';
import { TokenService } from '../../services/token/token.service';
import { DatePipe, NgForOf, NgIf } from '@angular/common';
import { UserService } from '../../services/services/user.service';
import { UserResponse } from '../../services/models/user-response';
import { TranslatePipe } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../services/services/order.service';
import { OrderResponse } from '../../services/models/order-response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [
    NgIf,
    TranslatePipe,
    FormsModule,
    DatePipe,
    NgForOf
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit, OnDestroy {

  userId = 0;
  profileData : UserResponse | undefined = undefined;
  profileSub: Subscription | undefined;

  ordersData: OrderResponse[] = [];
  ordersSub: Subscription | undefined;

  marketId: number = -1;
  stallId: number = -1;
  isAdmin: boolean = false;

  constructor(
    private router: Router,
    public tokenService: TokenService,
    private userService: UserService,
    private orderService: OrderService
  ) {

  }

  ngOnInit(): void {
    this.userId = this.tokenService.id;
    this.marketId = this.tokenService.market;
    this.stallId = this.tokenService.stall;
    this.isAdmin = this.tokenService.admin === 1;
    this.getProfileData();
    this.getOrdersData();
  }

  ngOnDestroy(): void {
    if (this.profileSub !== undefined) {
      this.profileSub.unsubscribe();
      console.log(`profileSub unsubscribed`);
    }

    if (this.ordersSub !== undefined) {
      this.ordersSub.unsubscribe();
      console.log(`ordersSub unsubscribed`);
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

  getOrdersData() {
    this.ordersSub = this.orderService.getOrdersFromUserId({
      id: this.userId
    }).subscribe({
      next: (data) => {
        this.ordersData = data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  goToMarket() {
    this.router.navigate(['stalls', this.marketId]);
  }

  goToStall() {
    this.router.navigate(['stall', this.stallId]);
  }
}
