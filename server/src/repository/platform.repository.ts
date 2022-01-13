import { EntityRepository, Repository } from 'typeorm';
import { PlatformEntity } from '../domain/platform.entity';

@EntityRepository(PlatformEntity)
export class PlatformRepository extends Repository<PlatformEntity> {}
