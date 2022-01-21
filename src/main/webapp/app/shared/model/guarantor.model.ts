import dayjs from 'dayjs';
import { IChampion } from 'app/shared/model/champion.model';

export interface IGuarantor {
  id?: number;
  firstName?: string | null;
  lastName?: string | null;
  dateOfBirth?: string | null;
  relationship?: string | null;
  knowHowLong?: string | null;
  occupation?: string | null;
  homeAddress?: string | null;
  officeAddress?: string | null;
  utilityUploadContentType?: string | null;
  utilityUpload?: string | null;
  idUploadContentType?: string | null;
  idUpload?: string | null;
  champion?: IChampion | null;
}

export const defaultValue: Readonly<IGuarantor> = {};
