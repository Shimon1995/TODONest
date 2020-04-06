import { Injectable } from '@nestjs/common';
import { users } from 'src/users/users';
import User from './User';


@Injectable()
export class UsersService {

  async findOne(username: string): Promise<any | undefined> {
    return users.find(user => user.username === username);
  }

  async addOne(user: User) {
    users.push(user);
  }
}
