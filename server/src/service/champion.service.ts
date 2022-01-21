import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { ChampionDTO } from '../service/dto/champion.dto';
import { ChampionMapper } from '../service/mapper/champion.mapper';
import { ChampionRepository } from '../repository/champion.repository';

const relationshipNames = [];
relationshipNames.push('platform');

@Injectable()
export class ChampionService {
    logger = new Logger('ChampionService');

    constructor(@InjectRepository(ChampionRepository) private championEntityRepository: ChampionRepository) {}

    async findById(id: number): Promise<ChampionDTO | undefined> {
        const options = { relations: relationshipNames };
        const result = await this.championEntityRepository.findOne(id, options);
        return ChampionMapper.fromEntityToDTO(result);
    }

    async findByFields(options: FindOneOptions<ChampionDTO>): Promise<ChampionDTO | undefined> {
        const result = await this.championEntityRepository.findOne(options);
        return ChampionMapper.fromEntityToDTO(result);
    }

    async findAndCount(options: FindManyOptions<ChampionDTO>): Promise<[ChampionDTO[], number]> {
        options.relations = relationshipNames;
        const resultList = await this.championEntityRepository.findAndCount(options);
        const championEntityDTO: ChampionDTO[] = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach(championEntity =>
                championEntityDTO.push(ChampionMapper.fromEntityToDTO(championEntity)),
            );
            resultList[0] = championEntityDTO;
        }
        return resultList;
    }

    async save(championEntityDTO: ChampionDTO, creator?: string): Promise<ChampionDTO | undefined> {
        const entity = ChampionMapper.fromDTOtoEntity(championEntityDTO);
        if (creator) {
            if (!entity.createdBy) {
                entity.createdBy = creator;
            }
            entity.lastModifiedBy = creator;
        }
        const result = await this.championEntityRepository.save(entity);
        return ChampionMapper.fromEntityToDTO(result);
    }

    async update(championEntityDTO: ChampionDTO, updater?: string): Promise<ChampionDTO | undefined> {
        const entity = ChampionMapper.fromDTOtoEntity(championEntityDTO);
        if (updater) {
            entity.lastModifiedBy = updater;
        }
        const result = await this.championEntityRepository.save(entity);
        return ChampionMapper.fromEntityToDTO(result);
    }

    async deleteById(id: number): Promise<void | undefined> {
        await this.championEntityRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
            throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
        }
        return;
    }
}
