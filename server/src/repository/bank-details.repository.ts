import { EntityRepository, Repository } from 'typeorm';
import { BankDetailsEntity } from '../domain/bank-details.entity';

@EntityRepository(BankDetailsEntity)
export class BankDetailsRepository extends Repository<BankDetailsEntity> {}
