import { Entity } from "../_common/entity.js";
import { Password } from "./password.vo.js";

interface UserProperties {
  username: string;
  password: Password;
}

export class User extends Entity<UserProperties> {
  constructor(properties: UserProperties, id?: string) {
    super(properties, id);
  }

  get username() {
    return this.properties.username;
  }

  get password() {
    return this.properties.password;
  }
}
