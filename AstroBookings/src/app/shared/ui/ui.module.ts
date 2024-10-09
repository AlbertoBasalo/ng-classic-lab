import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AtomsModule } from '../atoms/atoms.module';
import { PageHeaderBlock } from './page-header.block';

@NgModule({
  imports: [CommonModule, AtomsModule],
  declarations: [PageHeaderBlock],
  exports: [PageHeaderBlock],
})
export class UiModule {}
