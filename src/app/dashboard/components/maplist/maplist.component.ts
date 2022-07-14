import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-maplist',
  templateUrl: './maplist.component.html',
  styleUrls: ['./maplist.component.css'],
})
export class MaplistComponent implements OnInit {
  maplist: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: string) {
    this.maplist = data;
  }

  ngOnInit(): void {}
}
