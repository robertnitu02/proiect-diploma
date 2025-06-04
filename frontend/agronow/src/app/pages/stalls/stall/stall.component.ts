import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StallService } from '../../../services/services/stall.service';
import { StallResponse } from '../../../services/models/stall-response';
import { Subscription } from 'rxjs';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { TokenService} from '../../../services/token/token.service';
import { ProductData } from '../product.data';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateProduct } from './update-product.data';
import { OrderService } from '../../../services/services/order.service';
import { Order } from '../../../services/models/order';
import {OrderResponse} from '../../../services/models/order-response';
import {UpdateOrderData} from '../../../services/models/update-order-data';

@Component({
  selector: 'app-stall',
  imports: [
    NgIf,
    TranslatePipe,
    NgForOf,
    ReactiveFormsModule,
    FormsModule,
    DatePipe
  ],
  templateUrl: './stall.component.html',
  styleUrl: './stall.component.css'
})
export class StallComponent implements OnInit, OnDestroy {

  userId: number = -1;

  stallId: number = -1;
  stall: StallResponse | undefined;
  stallSub: Subscription | undefined;

  productsData: ProductData[] = [];
  orderData: ProductData[] = [];

  isStallOwner = false;
  stallOwnerProductsData: ProductData[] = [];
  updateSub: Subscription | undefined;

  orderSub: Subscription | undefined;
  address: string = '';

  stallOrders: OrderResponse[] = [];
  stallOrdersSub: Subscription | undefined;

  orderUpdateSub: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tokenService: TokenService,
    private stallService: StallService,
    private orderService: OrderService) {
  }

  ngOnInit(): void {
    this.userId = this.tokenService.id;
    this.stallId = Number(this.route.snapshot.paramMap.get('id'));

    this.isStallOwner = this.tokenService.stall === this.stallId;

    this.getStall();
    this.getOrdersFromStall();
  }

  ngOnDestroy(): void {
    if (this.stallSub !== undefined) {
      this.stallSub.unsubscribe();
      console.log('stallSub unsubscribed');
    }

    if (this.updateSub !== undefined) {
      this.updateSub.unsubscribe();
      console.log('updateSub unsubscribed');
    }

    if (this.orderSub !== undefined) {
      this.orderSub.unsubscribe();
      console.log('orderSub unsubscribed');
    }

    if (this.stallOrdersSub !== undefined) {
      this.stallOrdersSub.unsubscribe();
      console.log('stallOrdersSub unsubscribed');
    }

    if (this.orderUpdateSub !== undefined) {
      this.orderUpdateSub.unsubscribe();
      console.log('orderUpdateSub unsubscribed');
    }
  }

  submitOrder() {
    const finalOrderData = this.getFinalOrder();
    if (!this.isOrderValid(finalOrderData)) {
      // TODO: Implement messages
      return;
    }

    const data: Order = {
      products: JSON.stringify(finalOrderData),
      address: this.address,
      price: +this.calculateTotal(),
      status: 0,
      requesterId: this.userId,
      stallId: this.stallId
    };

    this.orderSub = this.orderService.addOrder({
      body: data
    }).subscribe({
      next: (data: any) => {
        // TODO: Implement messages
        this.refreshPage();
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  calculateTotal() {
    const finalOrderData = this.getFinalOrder();
    let price = 0;
    finalOrderData.forEach(el => {
      price += (el.quantity * el.price);
    });
    return price.toString();
  }

  addProduct() {
    const data = {
      id: this.stallOwnerProductsData.length,
      name: '',
      quantity: 0,
      price: 0,
    } as ProductData;

    this.stallOwnerProductsData.push(data);
  }

  removeProduct(productId: number) {
    const index = this.stallOwnerProductsData.findIndex(el => el.id === productId);
    console.log(index);
    if (index === -1) return;

    this.stallOwnerProductsData.splice(index, 1);
  }

  updateProducts() {
    const newProducts = JSON.stringify(this.stallOwnerProductsData);
    console.log(newProducts);

    const productData: UpdateProduct = {
      id: this.stall!.id!,
      products: newProducts
    };

    this.updateSub = this.stallService.updateProducts({
      body: productData
    }).subscribe({
      next: (data) => {
        console.log(data);
        setTimeout(() => {
          console.log('enter');
          window.location.reload();
        }, 2000);
      },
      error: err => {
        console.log(err);
      }
    });
  }

  goBack() {
    this.router.navigate(['stalls', this.stall?.marketId]);
  }

  beautifyProducts(products: string): string {
    let final = '';
    const dataParsed: ProductData[] = JSON.parse(products);
    dataParsed.forEach((product: ProductData) => {
      final += `${product.name} x ${product.quantity}; `;
    });
    return final;
  }

  onStatusChange(orderId: number, $event: any) {
    const data: UpdateOrderData = {
      id: orderId,
      status: $event.valueOf()
    };

    this.orderUpdateSub = this.orderService.updateOrder({
      body: data
    }).subscribe({
      next: (data: any) => {
        console.log(data);
        // TODO: Implement messages
        this.refreshPage();
      },
      error: err => {
        console.log(err);
      }
    });
  }

  private getStall(): void {
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
              quantity: 0,
              price: el.price
            });
          });

          this.stallOwnerProductsData = structuredClone(this.productsData);
        }
      },
      error: err => {
        console.log(err);
      }
    });
  }

  private getOrdersFromStall(): void {
    this.stallOrdersSub = this.orderService.getOrdersFromStallId({
      id: this.stallId
    }).subscribe({
      next: (data: OrderResponse[]) => {
        this.stallOrders = data;
      },
      error: err => {
        console.log(err);
      }
    });
  }

  private isOrderValid(finalOrderData: ProductData[]): boolean {
    return finalOrderData.length !== 0 && this.address !== '';
  }

  private getFinalOrder(): ProductData[] {
    let finalOrderData: ProductData[] = [];
    this.orderData.forEach(el => {
      if (el.quantity > 0 &&
        el.quantity <= this.productsData[el.id].quantity) {
        finalOrderData.push(el);
      }
    });

    return finalOrderData;
  }

  private refreshPage(): void {
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }
}
