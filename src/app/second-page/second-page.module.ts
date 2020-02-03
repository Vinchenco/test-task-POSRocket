import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SecondPageRoutingModule } from '@app/second-page/second-page-routing.module';
import { SecondPageComponent } from '@app/second-page/second-page.component';
import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SecondPageComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatSortModule,
    MatTableModule,
    TranslateModule,
    SecondPageRoutingModule,
    CoreModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class SecondPageModule {
}
