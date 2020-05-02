import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NotificationComponent } from './notification.component';

@NgModule({
  declarations: [NotificationComponent],
  exports: [NotificationComponent],
  imports: [CommonModule],
})
export class NotificationModule {}
