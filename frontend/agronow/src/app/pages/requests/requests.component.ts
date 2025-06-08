import { Component, OnDestroy, OnInit } from '@angular/core';
import { DatePipe, NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { Request } from '../../services/models/request';
import { Subscription } from 'rxjs';
import { RequestService } from '../../services/services/request.service';
import { RequestResponse } from '../../services/models/request-response';
import { TokenService } from '../../services/token/token.service';
import { RequestStatusData } from '../../services/models/request-status-data';

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

  requestData: Request = { type: 0, status: 0, message: '', links: '', requesterId: this.userId, imageUrl: '' };
  errorMessages: Array<string> = [];

  sendRequestSub: Subscription | undefined;

  userRequests: RequestResponse[] = [];
  userRequestSub: Subscription | undefined;
  hasRequests = false;

  isAdmin = false;
  usersRequests: RequestResponse[] = [];
  requestUpdateData: RequestStatusData[] = [];
  usersRequestsSub: Subscription | undefined;
  sendUpdateSub: Subscription | undefined;

  constructor(
    private requestService: RequestService,
    public tokenService: TokenService) {
  }

  ngOnInit(): void {
    this.userId = this.tokenService.id;
    this.isAdmin = this.tokenService.admin === 1;

    this.requestData.requesterId = this.userId;

    this.getUserRequests();
    this.getAdminRequests();
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

    if (this.usersRequestsSub !== undefined) {
      this.usersRequestsSub.unsubscribe();
      console.log('usersRequestsSub unsubscribed');
    }

    if (this.sendUpdateSub !== undefined) {
      this.sendUpdateSub.unsubscribe();
      console.log('sendUpdateSub unsubscribed');
    }
  }

  sendRequest() {
    this.errorMessages = [];
    if (!this.isRequestValid()) {
      this.errorMessages.push('Complete form');
      return;
    }

    this.sendRequestSub = this.requestService.addRequest({
      body: this.requestData
    }).subscribe({
      next: (res: Request) => {
        this.refreshPage();
      },
      error: err => {
        this.errorMessages.push(err.message);
      }
    });
  }

  submitRequestAnswer(requestId: number) {
    if (!this.isSubmitValid(requestId)) {
      return;
    }

    this.sendUpdateSub = this.requestService.updateRequestStatus({
      body: this.requestUpdateData[requestId]
    }).subscribe({
      next: (res: Request) => {
        this.refreshPage();
      },
      error: err => {
        console.log(JSON.stringify(err));
      }
    });
  }

  private getUserRequests(): void {
    this.userRequestSub = this.requestService.getRequestsByUserId({
      id: this.userId
    }).subscribe({
      next: (res: RequestResponse[]) => {
        console.log(res);
        this.hasRequests = res.length > 0;
        this.userRequests = res;
      },
      error: err => {
        console.log(err);
      }
    });
  }

  private getAdminRequests(): void {
    this.usersRequestsSub = this.requestService.getAllRequests()
      .subscribe({
        next: (res: RequestResponse[]) => {
          this.usersRequests = res;
          this.requestUpdateData = [];
          this.usersRequests.forEach((el) => {
            this.requestUpdateData[el.id!] = {
              id: el.id,
              status: 'PENDING',
              reason: ''
            };
          });
        },
        error: err => {
          console.log(err);
        }
      });
  }

  private isRequestValid(): boolean {
    return this.requestData.message !== '' &&
      this.requestData.links !== '' &&
      this.requestData.imageUrl !== '';
  }

  private isSubmitValid(requestId: number): boolean {
    return this.requestUpdateData[requestId] !== undefined &&
      this.requestUpdateData[requestId].reason !== '' &&
      this.requestUpdateData[requestId].status !== 'PENDING'
  }

  private refreshPage(): void {
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }
}
