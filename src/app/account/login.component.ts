import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AccountService } from '@app/core/services';


@Component({
templateUrl: 'login.component.html',
styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {
    form!: FormGroup;
    loading = false;
    submitted = false;
    error?: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService
    ) {
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;
        this.error = '';
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        this.accountService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    const returnUrl = this.route.snapshot.queryParams['returnUrl'];
                    if (this.accountService.userValue?.role == 'admin' && !returnUrl) {
                      this.router.navigate(['/product-management']);
                    }
                    else {
                      this.router.navigateByUrl(returnUrl || '/');
                    }
                },
                error: error => {
                    this.error = error;
                    this.loading = false;
                }
            });
    }
}
