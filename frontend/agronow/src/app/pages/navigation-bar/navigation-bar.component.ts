import {Component, OnDestroy, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../../services/token/token.service';
import { NgIf } from '@angular/common';
import { Subscription } from 'rxjs';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';

enum pages {
  LOGIN,
  HOME,
  PROFILE,
  MARKETS,
  REQUESTS,
}

@Component({
  selector: 'app-navigation-bar',
  imports: [
    NgIf,
    TranslatePipe
  ],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.css'
})
export class NavigationBarComponent implements OnInit, OnDestroy {

  isLogged = false;
  loginSub: Subscription | undefined;
  pageRoutes: Record<pages, string> = {
    [pages.HOME]: "home",
    [pages.LOGIN]: "login",
    [pages.PROFILE]: "profile",
    [pages.MARKETS]: "markets",
    [pages.REQUESTS]: "requests",
  };

  constructor(
    private route: Router,
    private tokenService: TokenService,
    private translate: TranslateService
  ) {
  }

  ngOnInit(): void {
    this.loginSub = this.tokenService.watchLoggedStatus()
      .subscribe(loggedStatus => {
        console.log(this.tokenService.token);
        this.isLogged = loggedStatus !== null;
      });
  }

  ngOnDestroy(): void {
    if (this.loginSub === undefined) return;

    this.loginSub.unsubscribe();
  }

  goToPage(page: pages) {
    let route = this.pageRoutes[page];
    this.route.navigate([route]);
  }

  logOut() {
    this.tokenService.reset();
    console.log('Logout');
  }

  changeLanguage() {
    const newValue = this.translate.getDefaultLang() === 'en' ? 'ro': 'en';
    this.translate.use(newValue);
    this.translate.setDefaultLang(newValue);
  }

  protected readonly pages = pages;
}
