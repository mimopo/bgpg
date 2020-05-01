import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { ToArrayPipe } from './pipes/to-array.pipe';
import { FormGroupComponent } from './components/form-group/form-group.component';
@NgModule({
  declarations: [SafeHtmlPipe, ToArrayPipe, FormGroupComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [CommonModule, SafeHtmlPipe, ToArrayPipe, FormGroupComponent, ReactiveFormsModule],
})
export class CoreModule {}
