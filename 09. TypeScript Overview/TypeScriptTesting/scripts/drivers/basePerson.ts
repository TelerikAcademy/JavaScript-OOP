module Drivers {
    export class BasePerson implements Person {
        private static Legs: number = 2;
        private static Hands: number = 2;

        constructor(public firstName: string, public lastName: string, public age: number = 18) { }

        static BodyParts(): Object {
            return {
                legs: this.Legs,
                hands: this.Hands
            };
        }

        greet() {
            return 'Hi, I am ' + this.firstName + ' ' + this.lastName;
        }
    }
}