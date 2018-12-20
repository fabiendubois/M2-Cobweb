import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  
  sign_in_form: FormGroup;

  constructor(public snackBar: MatSnackBar, private formBuilder: FormBuilder, private authService: AuthService, private router:Router) { }

  ngOnInit() {
    this.sign_in_form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  sign_in() {
    const val = this.sign_in_form.value;
    if (val.email && val.password) {
      this.authService.sign_in(val.email, val.password)
        .subscribe(
          (data) => {
              this.router.navigate(['/home']);
          },
          (error) => {this.snackBar.open(error.error.error, '', {
            duration: 2000
          }); }
        );
    }
  }

  redirect_to_sign_up(){
    this.router.navigate(['/auth/sign_up']);
  }

}
