import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from 'bcrypt';
import User from 'src/users/User';

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
    
    const password = await hash(pass, 10);
    const user = new User(username, password);
    this.usersService.addOne(user);
    return user;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      // eslint-disable-next-line @typescript-eslint/camelcase
      access_token: this.jwtService.sign(payload)
    }
  }
}
