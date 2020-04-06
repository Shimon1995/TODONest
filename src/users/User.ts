import { hash } from 'bcrypt';
import { TODO } from 'src/todo/todo.interface';
import { todo } from 'src/todo/todo';
import { v4 as uid } from 'uuid';

export default class User {
    password: string;
    userId: string;
    todo: TODO[];
    constructor(
        public username: string,
        password: string,
    ) {
        this.userId = uid();
        hash(password, 10).then(hash => this.password = hash);
        this.todo = todo;
    }
}