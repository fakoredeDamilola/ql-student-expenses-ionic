import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map, finalize } from "rxjs/operators";

import { environment } from "@environments/environment";
import { Account, Pet, Property } from "@app/_models";

const baseUrl = `${environment.apiUrl}/accounts`;

@Injectable({ providedIn: "root" })
export class AccountService {
  private accountSubject: BehaviorSubject<Account>;
  public account: Observable<Account>;

  constructor(private router: Router, private http: HttpClient) {
    this.accountSubject = new BehaviorSubject<Account>(null);
    this.account = this.accountSubject.asObservable();
  }

  public get accountValue(): Account {
    return this.accountSubject.value;
  }

  login(email: string, password: string) {
    return this.http
      .post<any>(
        `${baseUrl}/authenticate`,
        { email, password },
        { withCredentials: true }
      )
      .pipe(
        map((account) => {
          this.accountSubject.next(account);
          this.startRefreshTokenTimer();
          return account;
        })
      );
  }

  async logout() {
    this.http
      .post<any>(`${baseUrl}/revoke-token`, {}, { withCredentials: true })
      .subscribe();
    await this.stopRefreshTokenTimer();
    this.accountSubject.next(null);
    this.accountSubject = null;
    await this.router.navigateByUrl("/login");
    //location.reload();
  }

  refreshToken() {
    return this.http
      .post<any>(`${baseUrl}/refresh-token`, {}, { withCredentials: true })
      .pipe(
        map(async (account) => {
          this.accountSubject.next(await account);
          await this.startRefreshTokenTimer();
          return await account;
        })
      );
  }

  register(account: Account) {
    console.log(account, "<--Account for regular register");
    return this.http.post(`${baseUrl}/register`, account);
  }

  async verifyEmail(token: string) {
    return this.http.post(`${baseUrl}/verify-email`, { token });
  }

  async forgotPassword(email: string) {
    return this.http.post(`${baseUrl}/forgot-password`, { email });
  }

  async validateResetToken(token: string) {
    return this.http.post(`${baseUrl}/validate-reset-token`, { token });
  }

  async resetPassword(
    token: string,
    password: string,
    confirmPassword: string
  ) {
    return this.http.post(`${baseUrl}/reset-password`, {
      token,
      password,
      confirmPassword,
    });
  }

  async getAll() {
    return this.http.get<Account[]>(baseUrl);
  }

  async getById(accountId: string) {
    return this.http.get<Account>(`${baseUrl}/${accountId}`);
  }

  async getAllPetOwnersInProperties(propertyManagerId: string) {
    return this.http.get<Account>(`${baseUrl}/${propertyManagerId}/pet-owners`);
  }

  // This One ....
  async getPropertiesPets(propertyManagerId: string) {

    return this.http.get<Account>(`${baseUrl}/${propertyManagerId}/pets-on-properties`);

  }
  async getAllPropertiesOnAccount(propertyManagerId: string) {
    return this.http.get<Property>(
      `${baseUrl}/${propertyManagerId}/properties`
    );
  }
  async getAllPetsInProperties(propertyManagerId: string) {
    return this.http.get<Property>(
      `${baseUrl}/${propertyManagerId}/properties-pets`
    );
  }

  async getAllPetsOnAccount(accountId: string) {
    return this.http.get<Pet>(`${baseUrl}/${accountId}/pets`);
  }

  async create(params: any) {
    return this.http.post(baseUrl, params);
  }

  async update(accountId: string, params: any) {
    return this.http.put(`${baseUrl}/${accountId}`, params).pipe(
      map(async (account: any) => {
        // update the current account if it was updated
        if (account.id === this.accountValue.id) {
          // publish updated account to subscribers
          account = await { ...this.accountValue, ...account };
          this.accountSubject.next(account);
        }
        return await account;
      })
    );
  }

  delete(id: string) {
    return this.http.delete(`${baseUrl}/${id}`).pipe(
      finalize(() => {
        // auto logout if the logged in account was deleted
        if (id === this.accountValue.id) this.logout();
      })
    );
  }

  // helper methods

  private refreshTokenTimeout: any;

  private async startRefreshTokenTimer() {
    // parse json object from base64 encoded jwt token
    const jwtToken = await JSON.parse(
      atob(this.accountValue.jwtToken.split(".")[1])
    );
    // set a timeout to refresh the token a minute before it expires
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - 60 * 1000;
    this.refreshTokenTimeout = setTimeout(
      async () => this.refreshToken().subscribe(),
      timeout
    );
  }

  private async stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }
}
