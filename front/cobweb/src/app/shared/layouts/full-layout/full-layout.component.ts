import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-full-layout',
  templateUrl: './full-layout.component.html',
  styleUrls: ['./full-layout.component.css']
})
export class FullLayoutComponent implements OnInit {

  admin = false;
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.admin = this.authService.is_admin();
    
  }

  sign_out() {
    this.authService.sign_out();
    this.router.navigate(['/auth/sign_in']);
  }
}
