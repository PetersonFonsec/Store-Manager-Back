import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { RecovertPasswordRequest } from 'src/auth/interfaces/auth';
import { User } from 'src/users/interfaces/usuarios';

@Injectable()
export class PasswordValidationPipe implements PipeTransform {
  transform(value: User, metadata: ArgumentMetadata) {
    const isPassword = metadata.type === 'body';
    if (!isPassword) return false;
    validatioPassword(value.password);
    return value;
  }
}
@Injectable()
export class PasswordUpdateValidationPipe implements PipeTransform {
  transform(value: User, metadata: ArgumentMetadata) {
    if (typeof value === 'string') return;
    validatioPassword(value.password);
    return value;
  }
}

function validatioPassword(password: string) {
  const validations = [
    {
      validation: /(?=.*[a-z])/,
      mesage: 'The password must contain at least 1 lowercase character',
    },
    {
      validation: /(?=.*[A-Z])/,
      mesage: 'The password must contain at least 1 uppercase character',
    },
    {
      validation: /(?=.*[0-9])/,
      mesage: 'The password must contain at least 1 numeric character',
    },
    {
      validation: /(?=.{8,})/,
      mesage: 'The password must be eight characters or longer',
    },
    {
      validation: /(?=.*[!@#$%^&*])/,
      mesage: 'The password must contain at least one special character',
    },
  ];

  validations.forEach(({ validation, mesage }) => {
    if (!validation.test(password)) throw new BadRequestException(mesage);
  });
}
