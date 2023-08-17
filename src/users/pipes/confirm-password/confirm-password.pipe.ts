import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { User } from 'src/users/interfaces/usuarios';

@Injectable()
export class ConfirmPasswordPipe implements PipeTransform {
  transform(user: User, metadata: ArgumentMetadata) {
    const { password, confirm_password } = user;
    if (password !== confirm_password)
      throw new BadRequestException(`Passwords do not match`);
    return user;
  }
}

@Injectable()
export class ConfirmUpdatePasswordPipe implements PipeTransform {
  transform(user: User, metadata: ArgumentMetadata) {
    if(typeof user === 'string' || !user) return;
    const { password, confirm_password } = user;
    if (password !== confirm_password) throw new BadRequestException(`Passwords do not match`);
    return user;
  }
}