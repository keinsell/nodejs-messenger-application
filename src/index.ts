import { User } from "./user/entity.js";
import signle from "signale";
import { Password } from "./user/password.vo.js";
import { UserRepository } from "./user/repository.js";
import { Message } from "./message/entity.js";
import { Thread } from "./thread/entity.js";
import { MessageService } from "./message/service.js";

// Create and save core user

const keinsell = new User({
  username: "keinsell",
  password: await Password.fromPlain("keinsell"),
});

UserRepository.save(keinsell);

signle.success(`Created and saved User "${keinsell.username}"`);

// Create additional users

const uncreatedUsers = [
  new User({
    username: "test",
    password: await Password.fromPlain("test"),
  }),
  new User({
    username: "test2",
    password: await Password.fromPlain("test2"),
  }),
  new User({
    username: "test3",
    password: await Password.fromPlain("test3"),
  }),
];

// Save additional users
uncreatedUsers.forEach((user) => {
  UserRepository.save(user);
  signle.success(`Created and saved User "${user.username}"`);
});

// User Keinsell wants to message single user "test"

const keinsellUser = UserRepository.findByUsernameOrThrow("keinsell");
const testUser = UserRepository.findByUsernameOrThrow("test");

const thread = Thread.create([keinsellUser, testUser]);

signle.success(
  `Created Thread between "${keinsellUser.username}" and "${testUser.username}"`
);

// Keinsell sends message

const message = new Message({
  sender: keinsellUser,
  receiver: thread,
});

// Test sends message

const message2 = new Message({
  sender: testUser,
  receiver: thread,
});

MessageService.sendMessage(message);
MessageService.sendMessage(message2);

// User Keinsell wants to message multiple users

const thread2 = Thread.create([keinsellUser, testUser]);

console.log(thread2);
