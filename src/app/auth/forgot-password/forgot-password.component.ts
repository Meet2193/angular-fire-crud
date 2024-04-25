import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
})
export class ForgotPasswordComponent {
  formBuilder = inject(FormBuilder);
  toastr = inject(ToastrService);
  submitted = false;
  authService = inject(AuthService);
  router = inject(Router);

  forgotPsw: FormGroup = this.formBuilder.group({
    email: ['', Validators.required],
  });

  get getControl(): { [key: string]: AbstractControl } {
    return this.forgotPsw.controls;
  }

  sendForgotEmail() {
    this.submitted = true;
    if (this.forgotPsw.invalid) return;
    this.authService.forgotpassword(this.forgotPsw.value['email']).then(
      (res: any) => {
        console.log('res Forgotpassword', res);
        this.toastr.success('Please check your register email');
        this.router.navigateByUrl('/login');
      },
      (err) => {
        console.log('Error Forgot Password', err);
        this.toastr.error('Something Went Wrong Please try again.');
      }
    );
  }
}
