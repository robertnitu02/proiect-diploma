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

    this.getMarketsData();
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

  createMarket() {
    if (!this.isValidMarket()) {
      return;
    }

    this.addMarketSub = this.marketsService.addMarket({
      body: this.marketData
    }).subscribe({
      next: (data) => {
        this.refreshPage();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  goToMarketStalls(marketId: number) {
    this.router.navigate(['stalls', marketId]);
  }

  private getMarketsData() {
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

  private isValidMarket(): boolean {
    return this.marketData.imageUrl !== '' &&
      this.marketData.imageUrl !== '' &&
      this.marketData.schedule !== '';
  }

  private refreshPage(): void {
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }
}
