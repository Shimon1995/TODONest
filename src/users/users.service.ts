import { Injectable } from '@nestjs/common';
import User from './User';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User as UserInterface } from './user.interface';


@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<UserInterface>) {}

  async findOne(username: string): Promise<UserInterface | undefined> {
    return this.userModel.findOne({ username: username }).exec();
  }

  async addOne(user: User): Promise<UserInterface> {
    const createUser = new this.userModel(user);
    return createUser.save();
  }
}
