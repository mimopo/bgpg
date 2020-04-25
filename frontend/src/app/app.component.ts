import { Component, OnInit } from '@angular/core';
import { Socket } from './services/socket';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  // TODO: Better reconnection handling
  constructor(private socket: Socket) {}

  ngOnInit() {
    this.socket.on('disconnect', () => location.reload());
  }
}
