import { Subscription } from 'rxjs';

import { SeverityEnum } from 'src/app/notification/model/severity.enum';

export interface Message {
  content: string;
  severity: SeverityEnum;
  expiration?: number;
  subscription?: Subscription;
}
