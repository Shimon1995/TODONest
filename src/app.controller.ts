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
    return this.userService.findOne(req.user.username);
  }

  @UseGuards(JwtAuthGuard)
  @Get('todos')
  getDotos(@Request() req) {
    return this.todoService.getToDos(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('todos') 
  addTodo(@Request() req, @Body(new ValidationPipe) body: AddingToDoDTO) {
    this.todoService.addToDo(req.userId, body.newContext);
  }

  @UseGuards(JwtAuthGuard)
  @Post('patch-todos')
  patchToDo(@Request() req, @Body(new ValidationPipe) body: UpdateToDoDTO) {
    this.todoService.updateToDo(req.userId, body.id, body.newContext);
  }

  @UseGuards(JwtAuthGuard)
  @Post('do-doto')
  doToDo(@Request() req, @Body(new ValidationPipe) body: DoToDoDTO) {
    this.todoService.doneToDo(req.userId, body.id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('remove-todo')
  removeTodo(@Request() req, @Body(new ValidationPipe) body: RemoveToDoDTO) {
    this.todoService.removeToDo(req.userId, body.id);
  }
}
