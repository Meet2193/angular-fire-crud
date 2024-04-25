import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  formBuilder = inject(FormBuilder);
  submitted = false;
  authService = inject(AuthService);
  toastr = inject(ToastrService);
  router = inject(Router);

  constructor() {}

  get getControl(): { [key: string]: AbstractControl } {
    return this.loginData.controls;
  }

  loginData: FormGroup = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  doLogin() {
    this.submitted = true;
    console.log(this.loginData);
    if (this.loginData.invalid) return;

    if (this.loginData.value['email'] && this.loginData.value['password']) {
      this.authService
        .login(this.loginData.value['email'], this.loginData.value['password'])
        .then(
          (res: any) => {
            if (res) {
              console.log('login Succesfully :-', res);

              if (res.user?.emailVerified === true) {
                localStorage.setItem('FireBase-Token', 'true');
                this.toastr.success('login Succesfully');
                this.router.navigateByUrl('/dashboard');
              } else {
                this.router.navigateByUrl('/verify-email');
              }
            }
          },
          (err) => {
            this.toastr.error('Credential is wrong');
          }
        );
    }
  }

  loginWithpopup() {
    this.authService.loginWithpopup().then(
      (res: any) => {
        if (res && res['operationType'] === 'signIn') {
          console.log('loginWithpopup', res);
          this.toastr.success('Login Sucessfully');
          localStorage.setItem('FireBase-Token', 'true');
          this.router.navigateByUrl('/dashboard');
        }
      },
      (err) => {
        this.toastr.error('Something went wrong please try again');
      }
    );
  }
}
