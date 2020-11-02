import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from '@app/_services';

enum EmailStatus {
    Verifying,
    Failed
}

@Component({ templateUrl: 'verify-email.component.html' })
export class VerifyEmailComponent implements OnInit {
    EmailStatus = EmailStatus;
    emailStatus = EmailStatus.Verifying;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        //private alertService: AlertService
    ) { }

    ngOnInit() {
      console.log("getting here...")
        const token = this.route.snapshot.queryParams['token'];
        console.log("getting here...too",token)
        // remove token from url to prevent http referer leakage
        this.router.navigate([], { relativeTo: this.route, replaceUrl: true });
        console.log("getting here...too 2");
        this.accountService.verifyEmail(token)
            .pipe(first())
            .subscribe({
                next: () => {
                  console.log("getting here")
                    //this.alertService.success('Verification successful, you can now login', { keepAfterRouteChange: true });
                    this.router.navigateByUrl('../login');
                },
                error: () => {
                    this.emailStatus = EmailStatus.Failed;
                }
            });
    }
}
