import { Injectable } from '@nestjs/common';
import { users } from 'src/users/users';


@Injectable()
export class UsersService {

  async findOne(username: string): Promise<any | undefined> {
    return users.find(user => user.username === username);
  }

  async addOne(user: any) {
    users.push(user);
  }
}
