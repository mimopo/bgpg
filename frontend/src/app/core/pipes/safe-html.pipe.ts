import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safeHtml'
})
export class SafeHtmlPipe implements PipeTransform {

  constructor(public domSanitizer: DomSanitizer) {}

  transform(value: string) {
    return this.domSanitizer.bypassSecurityTrustHtml(value);
  }

}
