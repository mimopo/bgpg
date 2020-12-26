import { randomInt } from 'crypto';

import { Injectable } from '@nestjs/common';

import { animals } from './animals';
import { colors } from './colors';

@Injectable()
export class NameService {
  public generateName(): string {
    const color = this.randomElement(colors);
    const animal = this.randomElement(animals);
    const suffix = randomInt(0, 999).toString().padStart(3, '0');
    return `${color}-${animal}-${suffix}`;
  }

  private randomElement<T>(arr: T[]): T {
    return arr[randomInt(0, arr.length)];
  }
}
