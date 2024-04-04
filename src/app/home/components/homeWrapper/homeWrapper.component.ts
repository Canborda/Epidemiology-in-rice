import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-wrapper',
  templateUrl: './homeWrapper.component.html',
  styleUrls: ['./homeWrapper.component.css'],
})
export class HomeWrapperComponent implements OnInit {
  constructor(public router: Router) {}

  ngOnInit(): void {}
}
