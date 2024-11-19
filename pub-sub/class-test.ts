import { Subscribebale } from "./sub-function";

const sb = Subscribebale();
const sbs = sb.subscribe((message) => console.log(message));
sb.publish("hello");

sbs();

console.log(sb.subscriberesCount());

// Extending the Subscribebale class

// class User extends Subscribebale<string> {

//   constructor(public name: string) {
//     super();
//   }
//   setValue(value: string) {
//     this.name = value;
//     this.publish(value);
//   }
// }

// const newUser1 = new User("John");
// const newUserUnsubscribe = newUser1.subscribe((message) =>
//   console.log(message, "is user name")
// );
// const newUserUnsubscribe2 = newUser1.subscribe((message) =>
//   console.log(message, "is user name - 2")
// );

// newUser1.setValue("Kishore");

// newUserUnsubscribe();
// newUserUnsubscribe2();

// console.log(newUser1.subscriberesCount());
