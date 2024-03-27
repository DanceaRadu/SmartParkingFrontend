import { Component, OnDestroy, OnInit } from '@angular/core';
import { KeycloakProfile } from "keycloak-js";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";
import { KeycloakService } from "keycloak-angular";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit, OnDestroy {
  public isLoggedIn = false;
  public userProfile: KeycloakProfile | null = null;
  private subscription?: Subscription;

  finishLogin = false;

  constructor(
    private keycloakService: KeycloakService,
    private router: Router,
  ) {}

  public async ngOnInit() {
    this.isLoggedIn = this.keycloakService.isLoggedIn();
    if (this.isLoggedIn) {
      this.userProfile = await this.keycloakService.loadUserProfile();
      await this.keycloakService.getToken();
      this.finishLogin = true;
    } else {
      await this.keycloakService.login();
      this.finishLogin = true;
    }
    if (this.finishLogin) await this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
