import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';

import { SeverityEnum } from 'src/app/notification/model/severity.enum';
import { NotificationService } from 'src/app/notification/notification.service';
import { Socket } from './services/socket';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  connected = false;

  // TODO: Better reconnection handling
  constructor(private socket: Socket, private notification: NotificationService) {}

  ngOnInit() {
    this.connected = this.socket.connected;
    if (!this.connected) {
      this.socket.on('connect', () => {
        this.connected = true;
      });
    }
    this.socket.once('disconnect', () => {
      this.connected = false;
      this.notification.notify('Connection lost. Reconnecting...', SeverityEnum.danger);
      timer(1000).subscribe(() => {
        location.reload();
      });
    });
  }
}
