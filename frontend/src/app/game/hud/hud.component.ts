import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-hud',
  templateUrl: './hud.component.html',
  styleUrls: ['./hud.component.scss'],
})
export class HudComponent implements OnInit {
  @Input() room;
  tab = 'info';
  open = false;

  constructor() {}

  ngOnInit(): void {}
}
