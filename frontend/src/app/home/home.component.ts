import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  public submitting = false;
  public roomId = '';
  public error = '';

  constructor(private router: Router) {}

  create(): Promise<boolean> {
    this.submitting = true;
    this.error = '';
    return this.router.navigate(['game', 'create']).catch(() => {
      this.error = "Can't create a room";
      this.submitting = false;
      return false;
    });
  }

  join(id: string): Promise<boolean> {
    this.submitting = true;
    this.error = '';
    return this.router.navigate(['game', id]).catch(() => {
      this.error = `Can't connect to the room ${id}`;
      this.submitting = false;
      return false;
    });
  }
}
