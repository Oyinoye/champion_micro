import dayjs from 'dayjs';
import { IPlatform } from 'app/shared/model/platform.model';
import { MaxEvent } from 'app/shared/model/enumerations/max-event.model';

export interface IChampion {
  id?: number;
  championID?: string;
  phoneNumber?: string;
  status?: MaxEvent | null;
  bvn?: number | null;
  dateOfBirth?: string;
  platform?: IPlatform | null;
}

export const defaultValue: Readonly<IChampion> = {};
