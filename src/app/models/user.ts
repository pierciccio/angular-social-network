export class User {
    constructor(
        public _id: string,
        public firstname: string,
        public lastname: string,
        public age: number,
        public nickname: string,
        public email: string,
        public password: string,
        public role: string,
        public image: string

    ) {}
}