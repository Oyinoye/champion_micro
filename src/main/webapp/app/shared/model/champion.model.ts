import dayjs from 'dayjs';
import { IUser } from 'app/shared/model/user.model';
import { IPlatform } from 'app/shared/model/platform.model';
import { MaxEvent } from 'app/shared/model/enumerations/max-event.model';

export interface IChampion {
  id?: number;
  championID?: string;
  phoneNumber?: string;
  status?: MaxEvent | null;
  bvn?: number | null;
  dateOfBirth?: string | null;
  user?: IUser | null;
  platform?: IPlatform | null;
}

export const defaultValue: Readonly<IChampion> = {};
