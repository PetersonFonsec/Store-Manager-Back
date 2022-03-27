import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { Provider } from 'src/providers/interfaces/provider';

@Injectable()
export class CelphoneValidationPipe implements PipeTransform {
  transform(value: Provider, metadata: ArgumentMetadata) {
    const { celphone } = value;
    const isSizeValid = (phone) => /\d{10,11}/.test(phone);

    if (!isSizeValid(celphone)) {
      throw new BadRequestException(
        `Celphone: ${celphone} is invalid format the correct is only digits`,
      );
    }

    return value;
  }
}
