import dayjs from 'dayjs';
import { IChampion } from 'app/shared/model/champion.model';

export interface IDriverLicense {
  id?: number;
  licenseNumber?: string | null;
  issueDate?: string | null;
  expiryDate?: string | null;
  address?: string | null;
  comment?: string | null;
  champion?: IChampion;
}

export const defaultValue: Readonly<IDriverLicense> = {};
