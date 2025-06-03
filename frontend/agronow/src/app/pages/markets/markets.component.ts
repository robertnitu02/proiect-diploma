import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MarketService } from '../../services/services/market.service';
import { Market, MarketResponse } from '../../services/models';
import { Subscription } from 'rxjs';
import { NgForOf, NgIf } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { TokenService } from '../../services/token/token.service';

@Component({
  selector: 'app-markets',
  imports: [
    NgForOf,
    TranslatePipe,
    NgIf,
    FormsModule
  ],
  templateUrl: './markets.component.html',
  styleUrl: './markets.component.css'
})
export class MarketsComponent implements OnInit, OnDestroy {

  markets: MarketResponse[] = [];
  marketSub: Subscription | undefined;

  isAdmin = false;
  marketData: Market = {
    description: '',
    imageUrl: '',
    location: '',
    name: '',
    ownerId: 0,
    schedule: ''
  };
  addMarketSub: Subscription | undefined = undefined;

  constructor(
    private router: Router,
    private marketsService: MarketService,
    private tokenService: TokenService
  ) {

  }

  ngOnInit(): void {
    this.isAdmin = this.tokenService.admin === 1;
    console.log(this.tokenService.admin + ' ' + this.isAdmin);

    this.marketSub = this.marketsService.getAllMarkets()
      .subscribe({
        next: (data) => {
          console.log('Markets: ' + data);
          this.markets = data;
        },
        error: (err) => {
          console.log(err);
        }
      });
  }

  ngOnDestroy(): void {
      if (this.marketSub !== undefined)
      {
        this.marketSub.unsubscribe();
        console.log('marketSub unsubscribed');
      }

      if (this.addMarketSub !== undefined) {
        this.addMarketSub.unsubscribe();
        console.log('addMarketSub unsubscribed');
      }
  }

  goToMarket(marketId: number) {
    this.router.navigate(['stalls', marketId]);
  }

  createMarket() {
    if (this.marketData.imageUrl === '' || this.marketData.imageUrl === '' ||
        this.marketData.schedule === '') {
      return;
    }

    this.addMarketSub = this.marketsService.addMarket({
      body: this.marketData
    }).subscribe({
      next: (data) => {
        console.log('Markets: ' + data);
        setTimeout(() => {
          console.log('enter');
          window.location.reload();
        }, 2000);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
