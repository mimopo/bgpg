import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { InjectRepository } from '@nestjs/typeorm';
import { Dice } from './entities/dice.entity';
import { Repository } from 'typeorm';
import { toObjectId } from './utils/mongo';

@WebSocketGateway()
export class DiceGateway {
  @WebSocketServer() server: Server;

  constructor(@InjectRepository(Dice) private readonly diceRepository: Repository<Dice>) {}

  @SubscribeMessage('roll')
  async roll(client: Socket, ids: string[]) {
    // TODO: Validate data and room (avoid not joined users to roll the dices)
    // TODO: Serialization and exclude fields
    // TODO: Analizar si es posible no enviar el objeto completo
    const dices = await this.diceRepository.findByIds(ids.map(id => toObjectId(id)));
    dices.forEach(d => this.rollDice(d));
    const roomId = dices[0].room;
    this.server.in(`${roomId}`).emit('dices', dices);
    return dices;
  }

  private async rollDice(dice: Dice) { 
    const result = Math.floor(Math.random() * dice.shapes.length);
    dice.shape = dice.shapes[result];
    await this.diceRepository.save(dice);
  }
}
