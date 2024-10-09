import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LinkAtom } from './link.atom';
import { PageHeaderBlock } from './page-header.block';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [LinkAtom, PageHeaderBlock],
  exports: [LinkAtom, PageHeaderBlock],
})
export class UiModule {}
