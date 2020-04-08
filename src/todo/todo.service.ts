import { Injectable } from '@nestjs/common';
import { remove } from 'lodash';
import { users } from 'src/users/users';
import { TODO } from './todo.interface';
import { v4 as uid } from 'uuid';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/users/user.interface';

@Injectable()
export class TodoService {
    constructor(@InjectModel('User') private userModel: Model<User>) {}

    getToDos(userId: string) {
        return users.find(user => user.userId === userId).todo.reverse();
    }

    addToDo(userId: string, context: string) {
        const id = uid();
        const todo: TODO = {
            id,
            context,
            done: false,
        };
        users.find(user => user.userId === userId).todo.push(todo);
    }

    async doneToDo(userId: string, id: string) {
        users.find(user => user.userId === userId).todo.find(
            todo => todo.id === id
        ).done = !users.find(user => user.userId === userId).todo.find(
            todo => todo.id === id
        ).done;
    }

    async updateToDo(userId: string, id: string, newContext: string) {
        users.find(user => user.userId === userId).todo.find(todo => todo.id === id).context = newContext;
    }

    async removeToDo(userId: string, id: string) {
        remove(users.find(user => user.userId === userId).todo, (t: TODO) => t.id === id);
    }
}
