import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexRoutingModule } from './index-routing.module';

import { WrapperComponent } from './components/wrapper/wrapper.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [WrapperComponent, SignupComponent, LoginComponent],
  imports: [CommonModule, IndexRoutingModule],
})
export class IndexModule {}
