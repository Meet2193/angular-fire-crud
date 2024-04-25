import { AuthService } from './../../auth.service';
import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  formBuilder = inject(FormBuilder);
  submitted = false;
  authService = inject(AuthService);
  router = inject(Router);
  toastr = inject(ToastrService);

  get getControl(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }

  registerForm: FormGroup = this.formBuilder.group({
    phoneNumber: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  doRegister() {
    this.submitted = true;
    if (this.registerForm.invalid) return;
    console.log(this.registerForm);

    if (
      this.registerForm.value['email'] &&
      this.registerForm.value['password']
    ) {
      this.authService
        .signup(
          this.registerForm.value['email'],
          this.registerForm.value['password']
        )
        .then((res: any) => {
          this.toastr.success('Resgitration Sucessfully');
          localStorage.setItem('loggedUser', this.registerForm.value['email']);
          this.authService.sendUserVerification(res.user);
        });
    }
  }

  loginWithpopup() {
    this.authService.loginWithpopup().then(
      (res: any) => {
        if (res && res['operationType'] === 'signIn') {
          this.toastr.success('Register Sucessfully');
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
