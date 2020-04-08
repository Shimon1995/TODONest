import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { TodoModule } from './todo/todo.module';
import { TodoService } from './todo/todo.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://localhost:27017/nest', 
      { useUnifiedTopology: true, useNewUrlParser: true }
    ),
    AuthModule, 
    UsersModule, 
    TodoModule,
  ],
  controllers: [AppController],
  providers: [UsersService, TodoService],
})
export class AppModule {}
