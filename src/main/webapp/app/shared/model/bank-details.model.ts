import { IChampion } from 'app/shared/model/champion.model';

export interface IBankDetails {
  id?: number;
  bankName?: string | null;
  accountNumber?: string | null;
  champion?: IChampion | null;
}

export const defaultValue: Readonly<IBankDetails> = {};
