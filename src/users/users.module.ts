import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { usersSchema } from './interfaces/usuarios.schema';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [
    MongooseModule.forFeature([{ name: 'Users', schema: usersSchema }]),
  ],
})
export class UsersModule {}
