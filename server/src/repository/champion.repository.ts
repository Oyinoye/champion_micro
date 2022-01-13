import { EntityRepository, Repository } from 'typeorm';
import { ChampionEntity } from '../domain/champion.entity';

@EntityRepository(ChampionEntity)
export class ChampionRepository extends Repository<ChampionEntity> {}
