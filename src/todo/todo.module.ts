import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/users/user.schema';

@Module({
  imports: [MongooseModule
    .forFeature([{ name: 'User', schema: UserSchema }])],
  providers: [TodoService]
})
export class TodoModule {}
