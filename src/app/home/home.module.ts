import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ChartsModule } from 'ng2-charts';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [CommonModule, TranslateModule, CoreModule, SharedModule, NgbModule, HomeRoutingModule, ChartsModule],
  declarations: [HomeComponent],
  providers: [NgbDropdownModule],
  exports: [],
})
export class HomeModule {}
