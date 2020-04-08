import { Controller, Get, Post, UseGuards, Request, Body, Delete, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';
import { TodoService } from './todo/todo.service';
import { RegistrationDTO, AddingToDoDTO, UpdateToDoDTO, DoToDoDTO, RemoveToDoDTO } from './dto';
import { User } from './users/user.interface';

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
  async login(@Request() req) {
    const { userId, username } = req.user._doc;
    return this.authService.login(userId, username);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return this.userService.findOne(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('todos')
  getDotos(@Request() req) {
    return this.todoService.getToDos(req.user.username);
  }

  @UseGuards(JwtAuthGuard)
  @Post('todos') 
  async addTodo(@Request() req, @Body(new ValidationPipe) body: AddingToDoDTO) {
    // console.log(req.user);
    return this.todoService.addToDo(req.user.username, body.newContext); // username swaped with userId
  }

  @UseGuards(JwtAuthGuard)
  @Post('patch-todos')
  async patchToDo(@Request() req, @Body(new ValidationPipe) body: UpdateToDoDTO) {
    return this.todoService.updateToDo(req.user.username, body.id, body.newContext);
  }

  @UseGuards(JwtAuthGuard)
  @Post('do-todo')
  async doToDo(@Request() req, @Body(new ValidationPipe) body: DoToDoDTO) {
    return this.todoService.doneToDo(req.user.username, body.id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('remove-todo')
  removeTodo(@Request() req, @Body(new ValidationPipe) body: RemoveToDoDTO) {
    return this.todoService.removeToDo(req.user.username, body.id);
  }
}
