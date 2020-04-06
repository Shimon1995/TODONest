import { Injectable } from '@nestjs/common';
import { remove } from 'lodash';
import { users } from 'src/users/users';

export type TODO = any;

@Injectable()
export class TodoService {

    getToDos(userId: string) {
        return users.find(user => user.userId === userId).todo.reverse();
    }

    addToDo(userId: string, todo: TODO) {
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
