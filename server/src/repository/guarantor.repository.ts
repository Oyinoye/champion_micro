import { EntityRepository, Repository } from 'typeorm';
import { GuarantorEntity } from '../domain/guarantor.entity';

@EntityRepository(GuarantorEntity)
export class GuarantorRepository extends Repository<GuarantorEntity> {}
