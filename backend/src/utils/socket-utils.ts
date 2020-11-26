import { Namespace, Server, Socket } from 'socket.io';
import { classToPlain } from 'class-transformer';

import { Events } from '../common/api/events';

export type SocketIoEmitter = {
  emit: Socket['emit'] | Server['emit'] | Namespace['emit'];
};

export class SocketUtils {
  static emit<K extends keyof Events>(socket: SocketIoEmitter, event: K, data: Parameters<Events[K]>[0], ack?: () => void): boolean {
    const message = data !== null && typeof data === 'object' ? classToPlain(data) : data;
    if (ack) {
      return !!socket.emit(`${event}`, message, ack);
    }
    return !!socket.emit(`${event}`, message);
  }

  static async join(client: Socket, roomId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      client.join(roomId, e => {
        if (e) {
          reject(e);
        } else {
          resolve();
        }
      });
    });
  }

  static async leave(client: Socket, roomId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      client.leave(roomId, (e: unknown) => {
        if (e) {
          reject(e);
        } else {
          resolve();
        }
      });
    });
  }
}
