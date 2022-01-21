import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { GuarantorDTO } from '../service/dto/guarantor.dto';
import { GuarantorMapper } from '../service/mapper/guarantor.mapper';
import { GuarantorRepository } from '../repository/guarantor.repository';

const relationshipNames = [];

@Injectable()
export class GuarantorService {
    logger = new Logger('GuarantorService');

    constructor(@InjectRepository(GuarantorRepository) private guarantorEntityRepository: GuarantorRepository) {}

    async findById(id: number): Promise<GuarantorDTO | undefined> {
        const options = { relations: relationshipNames };
        const result = await this.guarantorEntityRepository.findOne(id, options);
        return GuarantorMapper.fromEntityToDTO(result);
    }

    async findByFields(options: FindOneOptions<GuarantorDTO>): Promise<GuarantorDTO | undefined> {
        const result = await this.guarantorEntityRepository.findOne(options);
        return GuarantorMapper.fromEntityToDTO(result);
    }

    async findAndCount(options: FindManyOptions<GuarantorDTO>): Promise<[GuarantorDTO[], number]> {
        options.relations = relationshipNames;
        const resultList = await this.guarantorEntityRepository.findAndCount(options);
        const guarantorEntityDTO: GuarantorDTO[] = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach(guarantorEntity =>
                guarantorEntityDTO.push(GuarantorMapper.fromEntityToDTO(guarantorEntity)),
            );
            resultList[0] = guarantorEntityDTO;
        }
        return resultList;
    }

    async save(guarantorEntityDTO: GuarantorDTO, creator?: string): Promise<GuarantorDTO | undefined> {
        const entity = GuarantorMapper.fromDTOtoEntity(guarantorEntityDTO);
        if (creator) {
            if (!entity.createdBy) {
                entity.createdBy = creator;
            }
            entity.lastModifiedBy = creator;
        }
        const result = await this.guarantorEntityRepository.save(entity);
        return GuarantorMapper.fromEntityToDTO(result);
    }

    async update(guarantorEntityDTO: GuarantorDTO, updater?: string): Promise<GuarantorDTO | undefined> {
        const entity = GuarantorMapper.fromDTOtoEntity(guarantorEntityDTO);
        if (updater) {
            entity.lastModifiedBy = updater;
        }
        const result = await this.guarantorEntityRepository.save(entity);
        return GuarantorMapper.fromEntityToDTO(result);
    }

    async deleteById(id: number): Promise<void | undefined> {
        await this.guarantorEntityRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
            throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
        }
        return;
    }
}
