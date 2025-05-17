import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shops',
  imports: [
    NgIf,
    TranslatePipe
  ],
  templateUrl: './shops.component.html',
  styleUrl: './shops.component.scss'
})
export class ShopsComponent {

  constructor(
    private router: Router
  ) {
  }

  goToShop(shopId: number) {
    console.log(shopId);
    this.router.navigate(['shop']);
  }
}
