import { hashSync } from 'bcrypt';
import { TODO } from 'src/todo/todo.interface';
import { todo } from 'src/todo/todo';
import { v4 as uid } from 'uuid';

export default class User {
    public password: string;
    public userId: string;
    public todo: TODO[];

    constructor(
        public username: string,
        password: string,
    ) {
        this.userId = uid();
        this.password = hashSync(password, 10);
        this.todo = todo;
    }
}