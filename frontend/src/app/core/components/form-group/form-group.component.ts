import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-group',
  templateUrl: './form-group.component.html',
  styleUrls: ['./form-group.component.scss'],
})
export class FormGroupComponent implements OnInit {
  @HostBinding('class') css = 'form-group';
  @Input() control: FormControl;

  constructor() {}

  ngOnInit(): void {}
}
