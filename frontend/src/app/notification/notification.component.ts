import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, timer } from 'rxjs';

import { Message } from 'src/app/notification/model/message.interface';
import { NotificationService } from 'src/app/notification/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
})
export class NotificationComponent implements OnInit, OnDestroy {
  messages: Message[] = [];
  private subscription: Subscription;

  constructor(private service: NotificationService) {}

  ngOnInit(): void {
    this.subscription = this.service.messages.subscribe((message) => {
      if (message.expiration) {
        message.subscription = timer(message.expiration).subscribe(() => this.remove(message));
      }
      this.messages.push(message);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.messages.filter((m) => m.subscription).forEach((s) => s.subscription.unsubscribe());
  }

  remove(message: Message) {
    if (message.subscription) {
      message.subscription.unsubscribe();
    }
    const index = this.messages.indexOf(message);
    if (index !== -1) {
      this.messages.splice(index, 1);
    }
  }
}
