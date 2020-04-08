import { Document } from 'mongoose'
import { TODO } from 'src/todo/todo.interface';

export interface User extends Document {
    userId: string;
    username: string;
    password: string;
    todo: TODO[];
}