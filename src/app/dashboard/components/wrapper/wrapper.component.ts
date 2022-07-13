import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.css'],
})
export class WrapperComponent implements OnInit {
  isExpanded: boolean = false;
  userName: string = 'Camilo Borda';

  constructor(private router: Router, private toastr: ToastrService) {}

  ngOnInit(): void {
    // Check if login
    const access_token = localStorage.getItem('access_token');
    if (!access_token) {
      this.toastr.error('No has iniciado sesión', 'ERROR');
      this.router.navigate(['home/login']);
    } else {
      //TODO Get user with token
      //TODO Get stored maps
      console.log(access_token);
    }
  }
}
