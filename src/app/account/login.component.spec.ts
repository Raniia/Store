import { TestBed, ComponentFixture } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '@app/core/services';
import { of } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';

class MockAccountService {
  login(username: string, password: string) {
    return of({});
  }
  get userValue() {
    return { role: 'admin' };
  }
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let accountService: AccountService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule,         TranslateModule.forRoot(),
      ],
      declarations: [LoginComponent],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [
        FormBuilder,
        { provide: ActivatedRoute, useValue: {
            snapshot:{
                queryParams:{
                    
                }
            }
        } },
        { provide: Router, useValue: { navigate: ()=>{}, navigateByUrl: ()=>{} } },
        { provide: AccountService, useClass: MockAccountService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    accountService = TestBed.inject(AccountService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form with username and password controls', () => {
    expect(component.form.controls['username']).toBeTruthy();
    expect(component.form.controls['password']).toBeTruthy();
  });

  it('should have form invalid when empty', () => {
    expect(component.form.valid).toBeFalsy();
  });

  it('should call login method when the form is submitted with valid data', () => {
    spyOn(component, 'onSubmit').and.callThrough();
    component.form.controls['username'].setValue('StcUser');
    component.form.controls['password'].setValue('StcPassword');
    fixture.detectChanges();
    component.onSubmit();
    expect(component.onSubmit).toHaveBeenCalled();
    expect(component.loading).toBeTruthy();
  });

  it('should navigate to /product-management when user role is admin and no returnUrl', (done) => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    component.form.controls['username'].setValue('StcUser');
    component.form.controls['password'].setValue('StcPassword');
    fixture.detectChanges();
    component.onSubmit();
    fixture.whenStable().then(() => {
        expect(router.navigate).toHaveBeenCalledWith(['/product-management']);
        done();
    });
  });

  it('should navigate to returnUrl when user role is admin and returnUrl exists', (done) => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigateByUrl');
    const mockReturnUrl = '/product-view';
    const route = TestBed.inject(ActivatedRoute);
    route.snapshot.queryParams = { returnUrl: mockReturnUrl };
    component.form.controls['username'].setValue('StcUser');
    component.form.controls['password'].setValue('StcPassword');
    fixture.detectChanges();
    component.onSubmit();
    fixture.whenStable().then(() => {
        expect(router.navigateByUrl).toHaveBeenCalledWith(mockReturnUrl);
        done();
    });
  });

});