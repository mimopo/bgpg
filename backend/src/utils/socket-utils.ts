import { classToPlain } from 'class-transformer';
import { Namespace, Server, Socket } from 'socket.io';

export type SocketIoEmitter = {
  emit: Socket['emit'] | Server['emit'] | Namespace['emit'];
};

export class SocketUtils {
  static emit(socket: SocketIoEmitter, event: string, data?: any, ack?: () => void): boolean {
    const message = data !== null && typeof data === 'object' ? classToPlain(data) : data;
    if (ack) {
      return !!socket.emit(event, message, ack);
    } else {
      return !!socket.emit(event, message);
    }
  }

  static async join(client: Socket, roomId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      client.join(roomId, e => {
        e ? reject(e) : resolve();
      });
    });
  }

  static async leave(client: Socket, roomId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      client.leave(roomId, (e: any) => {
        e ? reject(e) : resolve();
      });
    });
  }
}
