import { Controller, Get, Post, UseGuards, Request, Body, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';
import { TodoService } from './todo/todo.service';

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
    private readonly todoService: TodoService
  ) {}

  @Post('auth/register')
  async register(@Body() body: {username: string; password: string}) {
    return this.authService.register(body.username, body.password);
  }

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
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
  addTodo(@Request() req, @Body() body) {
    this.todoService.addToDo(req.userId, body);
  }

  @UseGuards(JwtAuthGuard)
  @Post('patch-todos')
  patchToDo(@Request() req, @Body() body) {
    this.todoService.updateToDo(req.userId, body.id, body.newContext);
  }

  @UseGuards(JwtAuthGuard)
  @Post('do-doto')
  doToDo(@Request() req, @Body() body) {
    this.todoService.doneToDo(req.userId, body.id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('remove-todo')
  removeTodo(@Request() req, @Body() body) {
    this.todoService.removeToDo(req.userId, body.id);
  }
}
