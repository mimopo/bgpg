import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import io from 'socket.io-client';
import { NotificationModule } from 'src/app/notification/notification.module';
import { Socket } from './services/socket';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, NotificationModule],
  providers: [
    {
      provide: Socket,
      useFactory: () => {
        return io(environment.server, {
          transports: ['websocket'], // TODO: Remove
        });
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
