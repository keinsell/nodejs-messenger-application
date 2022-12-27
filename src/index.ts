import { Message } from "./message/message.entity.js";

const message: string = "Hello World";
console.log(message);

const sendMessage = new Message(message);

console.log(sendMessage);
