import { CdkDragMove } from '@angular/cdk/drag-drop';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { environment } from 'src/environments/environment';
import { Dice } from '../model/dice.class';
import { RoomService } from './services/room.service';
import { TokenService } from './services/token.service';

// TODO: Create class
type Token = any;

interface Position {
  x: number;
  y: number;
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  @ViewChild('box') box: ElementRef<SVGGraphicsElement>;

  board: string;
  room: any;
  showHud = false;
  dices: Dice[] = [];
  tokens: Token[] = [];
  shapes: Record<string, string> = {};

  constructor(private route: ActivatedRoute, private roomService: RoomService, private tokenService: TokenService) {}

  ngOnInit(): void {
    this.shapes = this.route.snapshot.data.game.shapes;
    this.board = environment.server + this.route.snapshot.data.game.board;
    this.roomService.room.subscribe((room) => (this.room = room));
    this.tokenService.tokens.subscribe((tokens) => (this.tokens = tokens));
  }

  move(item: Token, event: CdkDragMove) {
    // TODO: Calculate the difference between token x,y and pointer x,y
    // TODO: This is the best way?
    const { x, y } = this.translateCoordinates(event.pointerPosition);
    event.source._dragRef.setFreeDragPosition({ x, y });
    item.x = x;
    item.y = y;
    this.tokenService.move(item, x, y);
  }

  // TODO: Refactor
  top(item) {
    // todo
    console.log('todo');
  }

  private translateCoordinates(position: Position): Position {
    const CTM = this.box.nativeElement.getScreenCTM();
    return {
      x: (position.x - CTM.e) / CTM.a,
      y: (position.y - CTM.f) / CTM.d,
    };
  }
}
