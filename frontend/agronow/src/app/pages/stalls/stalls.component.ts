import {Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StallService } from '../../services/services/stall.service';
import { StallResponse } from '../../services/models/stall-response';
import { Subscription } from 'rxjs';
import { MarketResponse } from '../../services/models/market-response';
import { MarketService } from '../../services/services';
import {NgForOf, NgIf} from '@angular/common';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-stalls',
  imports: [
    NgIf,
    NgForOf,
    TranslatePipe
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

  constructor(
    private route: ActivatedRoute,
    private stallsService: StallService,
    private marketService: MarketService,
  ) {}

  ngOnInit() {
    this.marketId = Number(this.route.snapshot.paramMap.get('id'));
    console.log(this.marketId);

    this.stallsSub = this.stallsService.getStallsByMarketId({
      id: this.marketId
    }).subscribe({
      next: (data: StallResponse[]) => {
        console.log('Stalls: ' + data);
        this.stalls = data;
      },
      error: (error: Error) => {
        console.log(error);
      }
    });

    this.marketSub = this.marketService.getMarket({
      id: this.marketId
    }).subscribe({
      next: (data: MarketResponse) => {
        console.log('Market from Stalls: ' + data);
        this.market = data;
      },
      error: (error: Error) => {
        console.log(error);
      }
    });
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
}
