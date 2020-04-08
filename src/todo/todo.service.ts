import { Injectable } from '@nestjs/common';
import { remove } from 'lodash';
import { TODO } from './todo.interface';
import { v4 as uid } from 'uuid';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/users/user.interface';

@Injectable()
export class TodoService {
    constructor(@InjectModel('User') private userModel: Model<User>) {}

    async getToDos(userId: string): Promise<any> {
        const result = await this.userModel.findOne({ userId }, { todo: true }).exec();
        return result.todo.reverse()
    }

    async addToDo(userId: string, context: string) {
        const id = uid();
        const todo: TODO = {
            id,
            context,
            done: false,
        };
        return this.userModel.updateOne(
            { userId }, 
            { $push: { todo } }
        ).exec();
    }

    async doneToDo(userId: string, id: string) {
        const { todo } = await this.userModel.findOne({ userId });
        const newTodo: TODO[] = [];
        todo.forEach(t => {
            if (t.id === id) {
                t.done = !t.done;
            }
            newTodo.push(t);
        });
        return this.userModel.updateOne({ userId }, { $set: { todo: newTodo } }).exec();
    }

    async updateToDo(userId: string, id: string, newContext: string) {
        const { todo } = await this.userModel.findOne({ userId });
        const newTodo: TODO[] = [];
        todo.map(t => {
            if (t.id === id) {
                t.context = newContext;
            }
            newTodo.push(t);
        });
        return this.userModel.updateOne(
            { userId }, 
            { $set: { todo: newTodo } }
        ).exec();
    }

    async removeToDo(userId: string, id: string) {
        const { todo } = await this.userModel.findOne({ userId });
        remove(todo, t => t.id === id);
        console.log(todo);
        return this.userModel.updateOne({ userId }, { $set: { todo } });
    }
}
