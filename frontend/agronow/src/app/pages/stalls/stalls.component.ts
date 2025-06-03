import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StallService } from '../../services/services/stall.service';
import { StallResponse } from '../../services/models/stall-response';
import { Subscription } from 'rxjs';
import { MarketResponse } from '../../services/models/market-response';
import { MarketService } from '../../services/services';
import { NgForOf, NgIf } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { TokenService } from '../../services/token/token.service';
import { Stall } from '../../services/models/stall';
import { FormsModule } from '@angular/forms';
import { ProductData } from './product.data';

@Component({
  selector: 'app-stalls',
  imports: [
    NgIf,
    NgForOf,
    TranslatePipe,
    FormsModule
  ],
  templateUrl: './stalls.component.html',
  styleUrl: './stalls.component.css'
})
export class StallsComponent implements OnInit, OnDestroy {

  marketId: number = -1;
  market: MarketResponse | undefined;
  marketSub: Subscription | undefined;

  stalls: StallResponse[] = [];
  stallsSub: Subscription | undefined;

  isMarketOwner = false;
  stallData: Stall = {
    description: '',
    imageUrl: '',
    marketPlacedId: 0,
    name: '',
    products: '',
    schedule: '',
    ownerId: 0
  };
  productsData: ProductData[] = [];
  createStallSub: Subscription | undefined = undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private stallsService: StallService,
    private marketService: MarketService,
    private tokenService: TokenService
  ) {}

  ngOnInit() {
    this.marketId = Number(this.route.snapshot.paramMap.get('id'));

    this.isMarketOwner = this.tokenService.market === this.marketId;

    this.getStalls();
    this.getMarket();
  }

  ngOnDestroy(): void {
    if (this.stallsSub !== undefined) {
      console.log('stallsSub unsubscribed');
      this.stallsSub.unsubscribe();
    }

    if (this.marketSub !== undefined) {
      console.log('marketSub unsubscribed');
      this.marketSub.unsubscribe();
    }
  }

  createStall() {
    this.stallData.products = JSON.stringify(this.productsData);
    if (!this.isStallValid()) {
      // TODO: Implement messages
      return;
    }

    this.stallData.marketPlacedId = this.marketId;

    this.createStallSub = this.stallsService.addStall({
      body: this.stallData
    }).subscribe({
      next: (data) => {
        // TODO: Implement messages
        this.refreshPage();
      },
      error: (error: Error) => {
        console.log(error);
      }
    });
  }

  addProduct() {
    const data = {
      id: this.productsData.length,
      name: '',
      quantity: 0,
      price: 0,
    } as ProductData;

    this.productsData.push(data);
  }

  removeProduct(id: number) {
    const index = this.productsData.findIndex(item => item.id === id);
    if (index === -1) return;

    this.productsData.splice(index, 1);
  }

  goToStall(stallId: number) {
    this.router.navigate(['stall', stallId]);
  }

  goBack() {
    this.router.navigate(['markets']);
  }

  private getStalls(): void {
    this.stallsSub = this.stallsService.getStallsByMarketId({
      id: this.marketId
    }).subscribe({
      next: (data: StallResponse[]) => {
        this.stalls = data;
      },
      error: (error: Error) => {
        console.log(error);
      }
    });
  }

  private getMarket(): void {
    this.marketSub = this.marketService.getMarket({
      id: this.marketId
    }).subscribe({
      next: (data: MarketResponse) => {
        this.market = data;
      },
      error: (error: Error) => {
        console.log(error);
      }
    });
  }

  private isStallValid(): boolean {
    return this.stallData.name !== '' && this.stallData.description !== '' &&
      this.stallData.schedule !== '' && this.stallData.products !== '' &&
      this.stallData.imageUrl !== '' && this.stallData.ownerId !== 0;
  }

  private refreshPage(): void {
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }
}
