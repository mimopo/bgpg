import { Component, OnInit } from '@angular/core';
import { LobbyService } from './lobby.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {

  rooms: [] = [];

  constructor(private lobbyService: LobbyService) { }

  ngOnInit(): void {
    this.lobbyService.rooms.subscribe(rooms => this.rooms = rooms);
  }

}
