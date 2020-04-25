import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import io from 'socket.io-client';
import { Socket } from './services/socket';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
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
