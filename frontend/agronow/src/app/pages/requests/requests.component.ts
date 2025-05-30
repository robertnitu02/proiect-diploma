import {Component, OnDestroy, OnInit} from '@angular/core';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { Request } from '../../services/models/request';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { RequestService } from '../../services/services/request.service';
import { RequestResponse } from '../../services/models/request-response';
import { TokenService } from '../../services/token/token.service';

@Component({
  selector: 'app-requests',
  imports: [
    NgIf,
    FormsModule,
    NgForOf,
    TranslatePipe,
    DatePipe
  ],
  templateUrl: './requests.component.html',
  styleUrl: './requests.component.css'
})
export class RequestsComponent implements OnInit, OnDestroy {

  userId = 0;

  isRequestFormActive = true;
  requestData: Request = { type: 0, status: 0, message: '', links: '', requesterId: this.userId };
  errorMessages: Array<string> = [];

  requestTypes: number[] = [0, 1, 2];
  sendRequestSub: Subscription | undefined;

  userRequests: RequestResponse[] = [];
  userRequestSub: Subscription | undefined;
  hasRequests = false;

  constructor(
    private router: Router,
    private requestService: RequestService,
    public tokenService: TokenService) {
  }

  ngOnInit(): void {
    this.userId = this.tokenService.id;
    this.requestData.requesterId = this.userId;

     this.userRequestSub = this.requestService.getRequestsByUserId({
       id: this.userId
     }).subscribe({
       next: (res: RequestResponse[]) => {
         console.log(res);
         this.hasRequests = true;
         this.userRequests = res;
       },
       error: err => {
         console.log(err);
       }
     });
  }


  ngOnDestroy(): void {
    if (this.sendRequestSub !== undefined) {
      this.sendRequestSub.unsubscribe();
      console.log('sendRequestSub unsubscribed');
    }

    if (this.userRequestSub !== undefined) {
      this.userRequestSub.unsubscribe();
      console.log('userRequestSub unsubscribed');
    }
  }

  sendRequest() {
    this.errorMessages = [];
    if (this.requestData.message === '' || this.requestData.links === '') {
      this.errorMessages.push('Complete form');
      return;
    }

    this.sendRequestSub = this.requestService.addRequest({
      body: this.requestData
    }).subscribe({
      next: (res: Request) => {
        console.log(res);
        setTimeout(() => {
          // this.router.navigate(['/requests']);
          console.log('enter');
          window.location.reload();
        }, 2000);
      },
      error: err => {
        console.log(JSON.stringify(err));
        this.errorMessages.push(err.message);
      }
    });
  }

}
