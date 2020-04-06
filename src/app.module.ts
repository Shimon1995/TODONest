import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { TodoModule } from './todo/todo.module';
import { TodoService } from './todo/todo.service';

@Module({
  imports: [AuthModule, UsersModule, TodoModule],
  controllers: [AppController],
  providers: [UsersService, TodoService],
})
export class AppModule {}
