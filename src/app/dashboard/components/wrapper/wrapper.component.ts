import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { UserService } from 'src/app/services/user.service';
import { SignupI } from 'src/app/models/user.model';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.css'],
})
export class WrapperComponent implements OnInit {
  isExpanded: boolean = true;
  user: SignupI | undefined;

  constructor(
    private router: Router,
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    // Check if login
    const access_token = localStorage.getItem('access_token');
    if (!access_token) {
      this.toastr.error('No has iniciado sesión', 'ERROR');
      this.router.navigate(['home/login']);
    } else {
      // Get user with token
      this.userService.getUser().subscribe((v) => {
        this.user = v.data;
      });
      //TODO Get stored maps
    }
  }

  // #region NavBar actions

  onLogout(): void {
    localStorage.clear();
    this.router.navigate(['']);
  }

  // #endregion
}
