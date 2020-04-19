import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';

@NgModule({
  declarations: [SafeHtmlPipe],
  imports: [CommonModule],
  exports: [CommonModule, SafeHtmlPipe],
})
export class CoreModule {}
