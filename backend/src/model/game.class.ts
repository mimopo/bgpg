export class Game {
  name: string;
  title: string;
  version: string;
  date: string;
  description: string;
  author: string;
  license: string;
  homepage?: string;
  keywords?: string[] = [];
  helpsite: string;
  generator?: string;
  board?: string;
  shapes: Record<string, string>;
  template: Template;

  constructor(data: Game) {
    // TODO: Use a parser
    for (let key in data) {
      this[key] = data[key];
    }
  }
}

class Template {
  tokens?: Record<string, TokenDef> = {};
  dices?: Record<string, TokenDef> = {};
  cards?: Record<string, TokenDef> = {};
  tiles?: Record<string, TokenDef> = {};
  timers?: Record<string, TokenDef> = {};
}

class TokenDef {
  shapes: string[];
  shape?: string;
  quantity?: number = 1;
  x?: number = 0;
  y?: number = 0;
  // TODO: define these properties
  help?: string;
  name?: string;
  type?: string;
}
