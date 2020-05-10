import { Component, OnInit } from '@angular/core';

import { SocketService } from './services/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  connected = false;

  constructor(private socket: SocketService) {}

  ngOnInit() {
    this.connected = this.socket.connected;
    this.socket.on('connect').subscribe(() => {
      this.connected = true;
    });
    this.socket.on('disconnect').subscribe(() => {
      this.connected = false;
    });
  }
}
