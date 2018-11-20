import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  sign_up_form: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router:Router) { }

  ngOnInit() {
    this.sign_up_form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/)]],
      admin: [false]
    });
  }

  sign_up() {
    const val = this.sign_up_form.value;
    console.log(val);
  }


  redirect_to_sign_in() {
    this.router.navigate(['/sign_in']);
  }

}
