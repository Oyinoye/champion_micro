import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { PlatformDTO } from '../service/dto/platform.dto';
import { PlatformMapper } from '../service/mapper/platform.mapper';
import { PlatformRepository } from '../repository/platform.repository';

const relationshipNames = [];

@Injectable()
export class PlatformService {
    logger = new Logger('PlatformService');

    constructor(@InjectRepository(PlatformRepository) private platformEntityRepository: PlatformRepository) {}

    async findById(id: number): Promise<PlatformDTO | undefined> {
        const options = { relations: relationshipNames };
        const result = await this.platformEntityRepository.findOne(id, options);
        return PlatformMapper.fromEntityToDTO(result);
    }

    async findByFields(options: FindOneOptions<PlatformDTO>): Promise<PlatformDTO | undefined> {
        const result = await this.platformEntityRepository.findOne(options);
        return PlatformMapper.fromEntityToDTO(result);
    }

    async findAndCount(options: FindManyOptions<PlatformDTO>): Promise<[PlatformDTO[], number]> {
        options.relations = relationshipNames;
        const resultList = await this.platformEntityRepository.findAndCount(options);
        const platformEntityDTO: PlatformDTO[] = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach(platformEntity =>
                platformEntityDTO.push(PlatformMapper.fromEntityToDTO(platformEntity)),
            );
            resultList[0] = platformEntityDTO;
        }
        return resultList;
    }

    async save(platformEntityDTO: PlatformDTO, creator?: string): Promise<PlatformDTO | undefined> {
        const entity = PlatformMapper.fromDTOtoEntity(platformEntityDTO);
        if (creator) {
            if (!entity.createdBy) {
                entity.createdBy = creator;
            }
            entity.lastModifiedBy = creator;
        }
        const result = await this.platformEntityRepository.save(entity);
        return PlatformMapper.fromEntityToDTO(result);
    }

    async update(platformEntityDTO: PlatformDTO, updater?: string): Promise<PlatformDTO | undefined> {
        const entity = PlatformMapper.fromDTOtoEntity(platformEntityDTO);
        if (updater) {
            entity.lastModifiedBy = updater;
        }
        const result = await this.platformEntityRepository.save(entity);
        return PlatformMapper.fromEntityToDTO(result);
    }

    async deleteById(id: number): Promise<void | undefined> {
        await this.platformEntityRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
            throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
        }
        return;
    }
}
