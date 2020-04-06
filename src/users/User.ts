import { hash } from 'bcrypt';
import { TODO } from 'src/todo/todo.service';
import { todo } from 'src/todo/todo';

export default class User {
    password: string;
    todo: TODO[];
    constructor(
        public userId: string,
        public username: string,
        password: string,
    ) {
        hash(password, 10).then(hash => this.password = hash);
        this.todo = todo;
    }
}