import { ConnectedSocket, OnGatewayConnection, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class MainGateway implements OnGatewayConnection {
  @WebSocketServer() private server!: Server;

  handleConnection(@ConnectedSocket() client: Socket) {
    this.server.emit('hello', client.id);
  }
}
