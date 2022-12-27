import { Entity } from "../_common/entity.js";

export class User extends Entity {
  name: string;
  email: string;
  password: string;

  constructor(
    properties: {
      name: string;
      email: string;
      password: string;
    },
    id?: string
  ) {
    super(id);
    this.name = properties.name;
    this.email = properties.email;
    this.password = properties.password;
  }
}
