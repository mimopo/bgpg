import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { RoomDto, ErrorDto } from '@mimopo/bgpg-core';

import { LobbyService } from './lobby.service';
import { EntityFormGroup } from 'src/app/entity-form-group.class';
import { NotificationService } from 'src/app/notification/notification.service';
import { SeverityEnum } from 'src/app/notification/model/severity.enum';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss'],
})
export class LobbyComponent {
  form = new EntityFormGroup(RoomDto, {
    game: 'parchis',
    name: 'Room',
    created: new Date(),
  });

  constructor(private lobbyService: LobbyService, private router: Router, private notification: NotificationService) {}

  async create() {
    this.form.disable();
    this.lobbyService.create(this.form.value).subscribe(
      (room: RoomDto) => this.router.navigate(['/game', room.id]),
      (error: ErrorDto) => {
        this.form.enable();
        this.notification.notify(error.message, SeverityEnum.danger, 5000);
      },
    );
  }
}
