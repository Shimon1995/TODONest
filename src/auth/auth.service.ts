import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import User from 'src/users/User';
import { User as UserInterface } from 'src/users/user.interface';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(username: string, pass: string): Promise<any> { // User without password
    const user: UserInterface = await this.usersService.findOne(username);
    const comparasion = await compare(pass, user.password);
    if (user && comparasion) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async register(username: string, password: string): Promise<UserInterface> {
    const user = new User(username, password);
    return this.usersService.addOne(user);
  }

  async login(username: string, userId: string): Promise<any> {
    const payload = { username: username, sub: userId };
    return {
      access_token: this.jwtService.sign(payload)
    }
  }
}
