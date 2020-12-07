import { Injectable } from "@angular/core";
import { AccountService, AlertService } from "@app/_services";
import { Storage } from "@ionic/storage";

@Injectable({
  providedIn: "root",
})
export class UserData {
  favorites: string[] = [];
  HAS_LOGGED_IN = "hasLoggedIn";

  constructor(public storage: Storage,
     public account: AccountService,
     private toastAlert: AlertService
     ) {}

  async login(email: string): Promise<any> {
    await this.storage.set(this.HAS_LOGGED_IN, true);
    await this.setUsername(email);
    return window.dispatchEvent(new CustomEvent("user:login"));
  }

  async signup(email: string): Promise<any> {
    (async () => {
      await this.setUsername(email);
      return;
    });
  }

  async logout(): Promise<any> {
    await this.storage.remove(this.HAS_LOGGED_IN);
    await this.account.logout();
    await this.storage.remove("email");
    window.dispatchEvent(new CustomEvent("user:logout"));
    //location.reload();
    return this.toastAlert.createToastAlert("Logout Successful","primary",4000);
  }

  async setUsername(email: string): Promise<any> {
    return await this.storage.set("email", email);
  }

  async getUsername(): Promise<string> {
    return await this.storage.get("email").then(async (value) => {
      return await value;
    });
  }

  async isLoggedIn(): Promise<boolean> {
    return await this.storage.get(this.HAS_LOGGED_IN).then(async (value) => {
      return (await value) === true;
    });
  }

}
