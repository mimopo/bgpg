import { ErrorResponse } from '../model/error-response';
import { EventsType } from '../types/events-type';

export interface ErrorEvents extends EventsType {
  exception(error: ErrorResponse): void;
}
