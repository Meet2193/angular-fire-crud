// import { RecaptchaVerifier, getAuth } from '@angular/fire/auth';
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
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';
import 'firebase/auth';
import { getAuth, RecaptchaVerifier } from 'firebase/auth';
import { signInWithPhoneNumber } from '@angular/fire/auth';

@Component({
  selector: 'app-phone-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './phone-login.component.html',
  styleUrl: './phone-login.component.css',
})
export class PhoneLoginComponent {
  formBuilder = inject(FormBuilder);
  submitted = false;
  authService = inject(AuthService);
  toastr = inject(ToastrService);
  router = inject(Router);

  auth = getAuth();
  flag = false;
  confirmationResult: any;
  invalidOtp = false;

  ngOnInit(): void {
    new RecaptchaVerifier(this.auth, 'recaptcha-container', {});
    (window as any).recaptchaVerifier = new RecaptchaVerifier(
      this.auth,
      'recaptcha-container',
      {}
    );
  }

  get getControl(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  get getOtpControl(): { [key: string]: AbstractControl } {
    return this.otpForm.controls;
  }

  loginForm: FormGroup = this.formBuilder.group({
    phoneNumber: ['', Validators.required],
  });

  otpForm: FormGroup = this.formBuilder.group({
    otp: ['', Validators.required],
  });

  async sendOTP() {
    this.submitted = true;

    if (!this.flag) {
      if (this.loginForm.invalid) return;
      const appVerifier = (window as any).recaptchaVerifier;

      this.confirmationResult = await signInWithPhoneNumber(
        this.auth,
        this.loginForm.value.phoneNumber,
        appVerifier
      );

      this.flag = true;
      this.submitted = false;
      return;
    }
    if (this.otpForm.invalid) return;
    // Obtain verificationCode from the user.
    const userCredential = await this.confirmationResult.confirm(
      this.otpForm.value.otp
    );
    console.log(userCredential);
    if (userCredential) {
      localStorage.setItem('FireBase-Token', 'true');
      this.flag = false;
      this.submitted = false;
      this.toastr.success('Login Sucessfully');
      this.router.navigateByUrl('/dashboard');
      this.invalidOtp = false;
    } else {
      this.invalidOtp = true;
    }
  }
}
