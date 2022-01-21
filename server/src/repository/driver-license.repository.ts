import { EntityRepository, Repository } from 'typeorm';
import { DriverLicenseEntity } from '../domain/driver-license.entity';

@EntityRepository(DriverLicenseEntity)
export class DriverLicenseRepository extends Repository<DriverLicenseEntity> {}
