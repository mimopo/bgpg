import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Message } from 'src/app/notification/model/message.interface';
import { SeverityEnum } from 'src/app/notification/model/severity.enum';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private subject = new Subject<Message>();

  get messages() {
    return this.subject.asObservable();
  }

  notify(content: string, severity: SeverityEnum = SeverityEnum.info, expiration?: number) {
    this.subject.next({
      content,
      severity,
      expiration,
    });
  }
}
