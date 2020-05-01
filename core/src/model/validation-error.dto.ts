import { ErrorDto } from './error.dto';

export class ValidationErrorDto extends ErrorDto {
  constraints: any;
}
