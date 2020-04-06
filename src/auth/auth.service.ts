import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { v4 as uid } from 'uuid';
import { todo } from 'src/todo/todo';
import { hash, compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    const comparasion = await compare(pass, user.password);
    if (user && comparasion) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async register(username: string, pass: string) {
    const id = uid();
    const password = await hash(pass, 10);
    this.usersService.addOne({id, username, password, todo});
    return { id, username, password, todo };
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      // eslint-disable-next-line @typescript-eslint/camelcase
      access_token: this.jwtService.sign(payload)
    }
  }
}
