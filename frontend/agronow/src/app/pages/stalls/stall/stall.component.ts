import { Component, OnDestroy, OnInit } from '@angular/core';
import {ActivatedRoute, Router } from '@angular/router';
import { StallService } from '../../../services/services/stall.service';
import { StallResponse } from '../../../services/models/stall-response';
import { Subscription } from 'rxjs';
import {NgForOf, NgIf} from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import {TokenService} from '../../../services/token/token.service';
import {ProductData} from '../product.data';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-stall',
  imports: [
    NgIf,
    TranslatePipe,
    NgForOf,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './stall.component.html',
  styleUrl: './stall.component.css'
})
export class StallComponent implements OnInit, OnDestroy {

  stallId: number = -1;
  stall: StallResponse | undefined;
  stallSub: Subscription | undefined;

  productsData: ProductData[] = [];
  orderData: ProductData[] = [];

  isStallOwner = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tokenService: TokenService,
    private stallService: StallService) {
  }

  ngOnInit(): void {
    this.stallId = Number(this.route.snapshot.paramMap.get('id'));
    console.log(this.stallId);

    this.isStallOwner = this.tokenService.stall === this.stallId;
    console.log(this.stallId + ' vs ' + this.tokenService.stall);

    this.stallSub = this.stallService.getStall({
      id: this.stallId
    }).subscribe({
      next: (data: StallResponse) => {
        console.log(data);
        this.stall = data;

        if (this.stall.products !== undefined) {
          this.productsData = JSON.parse(this.stall.products);
          this.productsData.forEach(el => {
            this.orderData.push({
              id: el.id,
              name: el.name,
              quantity: 0
            });
          })
        }
      },
      error: err => {
        console.log(err);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.stallSub !== undefined) {
      this.stallSub.unsubscribe();
      console.log('stallSub unsubscribed');
    }
  }

  goBack() {
    this.router.navigate(['stalls', this.stall?.marketId]);
  }

  submitOrder() {
    let finalOrderData: ProductData[] = [];
    this.orderData.forEach(el => {
      if (el.quantity > 0 &&
          el.quantity <= this.productsData[el.id].quantity) {
        finalOrderData.push(el);
      }
    });

    console.log(JSON.stringify(finalOrderData));
  }
}
