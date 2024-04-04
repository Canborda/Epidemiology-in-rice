import { MESSAGE_TYPES } from 'src/utils/enums';

export interface MessageI {
  text: string;
  type: MESSAGE_TYPES;
  read: boolean;
}
