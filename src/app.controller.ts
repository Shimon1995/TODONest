import { Controller, Get, Post, UseGuards, Body, Delete, ValidationPipe } from '@nestjs/common';
import { RegistrationDTO, AddingToDoDTO, UpdateToDoDTO, DoToDoDTO, RemoveToDoDTO } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';
import { TodoService } from './todo/todo.service';
import { User } from './users/user.interface';
import { User as UserDec } from 'src/users/user.decorator';

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
    private readonly todoService: TodoService
  ) {}

  @Post('auth/register')
  async register(@Body(new ValidationPipe) body: RegistrationDTO): Promise<User> {
    return this.authService.register(body.username, body.password);
  }

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@UserDec() user) {
    console.log(user);
    const { userId, username } = user._doc;
    return this.authService.login(userId, username);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@UserDec() user: User) {
    return this.userService.findOne(user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('todos')
  getDotos(@UserDec() user: User) {
    return this.todoService.getToDos(user.username);
  }

  @UseGuards(JwtAuthGuard)
  @Post('todos') 
  async addTodo(@UserDec() user: User, @Body(new ValidationPipe) body: AddingToDoDTO) {
    return this.todoService.addToDo(user.username, body.newContext); // username swaped with userId
  }

  @UseGuards(JwtAuthGuard)
  @Post('patch-todos')
  async patchToDo(@UserDec() user: User, @Body(new ValidationPipe) body: UpdateToDoDTO) {
    return this.todoService.updateToDo(user.username, body.id, body.newContext);
  }

  @UseGuards(JwtAuthGuard)
  @Post('do-todo')
  async doToDo(@UserDec() user: User, @Body(new ValidationPipe) body: DoToDoDTO) {
    return this.todoService.doneToDo(user.username, body.id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('remove-todo')
  removeTodo(@UserDec() user: User, @Body(new ValidationPipe) body: RemoveToDoDTO) {
    return this.todoService.removeToDo(user.username, body.id);
  }
}
