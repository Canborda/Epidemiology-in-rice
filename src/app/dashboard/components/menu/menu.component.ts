import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  isExpanded: boolean = true;
  userName: string = 'USUARIO DE PRUEBA';

  constructor() {}

  ngOnInit(): void {}

  // #region MENU OPTIONS actions

  onDrawMap(): void {
    console.log('ON DRAW MAP');
  }

  onSelectMap(): void {
    console.log('ON SELECT MAP');
  }

  onGenerateImage(): void {
    console.log('ON GENERATE IMAGE');
  }

  onGenerateChart(): void {
    console.log('ON GENERATE CHART');
  }

  onLogout(): void {
    console.log('ON LOGOUT');
  }

  // #endregion
}
