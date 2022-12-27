import cuid from "cuid";

export class Entity {
  id: string;

  constructor(id?: string) {
    this.id = id || cuid();
  }
}
