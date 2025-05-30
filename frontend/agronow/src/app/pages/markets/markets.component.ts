import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MarketService } from '../../services/services/market.service';
import { MarketResponse } from '../../services/models';
import { Subscription } from 'rxjs';
import { NgForOf } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-markets',
  imports: [
    NgForOf,
    TranslatePipe
  ],
  templateUrl: './markets.component.html',
  styleUrl: './markets.component.css'
})
export class MarketsComponent implements OnInit, OnDestroy {

  markets: MarketResponse[] = [];
  marketSub: Subscription | undefined;

  constructor(
    private router: Router,
    private marketsService: MarketService,
  ) {

  }

  ngOnInit(): void {
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
  }

  goToMarket(marketId: number) {
    this.router.navigate(['stalls', marketId]);
  }

}
