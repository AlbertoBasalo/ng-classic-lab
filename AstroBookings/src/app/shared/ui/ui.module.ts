import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PageHeaderComponent } from './page-header.component';

@NgModule({
  imports: [CommonModule],
  declarations: [PageHeaderComponent],
  exports: [PageHeaderComponent],
})
export class UiModule {}
