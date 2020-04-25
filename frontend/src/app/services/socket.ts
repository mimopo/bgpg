// tslint:disable: ban-types

/**
 * Socket.io Client definition to inject it as Angular service
 */
export class Socket implements SocketIOClient.Socket {
  io: SocketIOClient.Manager;
  nsp: string;
  id: string;
  connected: boolean;
  disconnected: boolean;
  open(): SocketIOClient.Socket {
    throw new Error('Method not implemented.');
  }
  connect(): SocketIOClient.Socket {
    throw new Error('Method not implemented.');
  }
  send(...args: any[]): SocketIOClient.Socket {
    throw new Error('Method not implemented.');
  }
  emit(event: string, ...args: any[]): SocketIOClient.Socket {
    throw new Error('Method not implemented.');
  }
  close(): SocketIOClient.Socket {
    throw new Error('Method not implemented.');
  }
  disconnect(): SocketIOClient.Socket {
    throw new Error('Method not implemented.');
  }
  compress(compress: boolean): SocketIOClient.Socket {
    throw new Error('Method not implemented.');
  }
  on(event: string, fn: Function): SocketIOClient.Emitter {
    throw new Error('Method not implemented.');
  }
  addEventListener(event: string, fn: Function): SocketIOClient.Emitter {
    throw new Error('Method not implemented.');
  }
  once(event: string, fn: Function): SocketIOClient.Emitter {
    throw new Error('Method not implemented.');
  }
  off(event: string, fn?: Function): SocketIOClient.Emitter {
    throw new Error('Method not implemented.');
  }
  removeListener(event: string, fn?: Function): SocketIOClient.Emitter {
    throw new Error('Method not implemented.');
  }
  removeEventListener(event: string, fn?: Function): SocketIOClient.Emitter {
    throw new Error('Method not implemented.');
  }
  removeAllListeners(): SocketIOClient.Emitter {
    throw new Error('Method not implemented.');
  }
  listeners(event: string): Function[] {
    throw new Error('Method not implemented.');
  }
  hasListeners(event: string): boolean {
    throw new Error('Method not implemented.');
  }
}
