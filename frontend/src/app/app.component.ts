import { Component, OnInit } from '@angular/core';

import { Socket } from './services/socket';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  connected = false;

  constructor(private socket: Socket) {}

  ngOnInit() {
    this.connected = this.socket.connected;
    if (!this.connected) {
      this.socket.on('connect', () => {
        this.connected = true;
      });
    }
    this.socket.once('disconnect', () => {
      this.connected = false;
    });
  }
}
