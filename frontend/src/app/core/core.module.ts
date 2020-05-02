import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroupComponent } from './components/form-group/form-group.component';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { ToArrayPipe } from './pipes/to-array.pipe';
@NgModule({
  declarations: [SafeHtmlPipe, ToArrayPipe, FormGroupComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [CommonModule, SafeHtmlPipe, ToArrayPipe, FormGroupComponent, ReactiveFormsModule],
})
export class CoreModule {}
