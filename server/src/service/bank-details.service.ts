import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { BankDetailsDTO } from '../service/dto/bank-details.dto';
import { BankDetailsMapper } from '../service/mapper/bank-details.mapper';
import { BankDetailsRepository } from '../repository/bank-details.repository';

const relationshipNames = [];
relationshipNames.push('champion');

@Injectable()
export class BankDetailsService {
    logger = new Logger('BankDetailsService');

    constructor(@InjectRepository(BankDetailsRepository) private bankDetailsEntityRepository: BankDetailsRepository) {}

    async findById(id: number): Promise<BankDetailsDTO | undefined> {
        const options = { relations: relationshipNames };
        const result = await this.bankDetailsEntityRepository.findOne(id, options);
        return BankDetailsMapper.fromEntityToDTO(result);
    }

    async findByFields(options: FindOneOptions<BankDetailsDTO>): Promise<BankDetailsDTO | undefined> {
        const result = await this.bankDetailsEntityRepository.findOne(options);
        return BankDetailsMapper.fromEntityToDTO(result);
    }

    async findAndCount(options: FindManyOptions<BankDetailsDTO>): Promise<[BankDetailsDTO[], number]> {
        options.relations = relationshipNames;
        const resultList = await this.bankDetailsEntityRepository.findAndCount(options);
        const bankDetailsEntityDTO: BankDetailsDTO[] = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach(bankDetailsEntity =>
                bankDetailsEntityDTO.push(BankDetailsMapper.fromEntityToDTO(bankDetailsEntity)),
            );
            resultList[0] = bankDetailsEntityDTO;
        }
        return resultList;
    }

    async save(bankDetailsEntityDTO: BankDetailsDTO, creator?: string): Promise<BankDetailsDTO | undefined> {
        const entity = BankDetailsMapper.fromDTOtoEntity(bankDetailsEntityDTO);
        if (creator) {
            if (!entity.createdBy) {
                entity.createdBy = creator;
            }
            entity.lastModifiedBy = creator;
        }
        const result = await this.bankDetailsEntityRepository.save(entity);
        return BankDetailsMapper.fromEntityToDTO(result);
    }

    async update(bankDetailsEntityDTO: BankDetailsDTO, updater?: string): Promise<BankDetailsDTO | undefined> {
        const entity = BankDetailsMapper.fromDTOtoEntity(bankDetailsEntityDTO);
        if (updater) {
            entity.lastModifiedBy = updater;
        }
        const result = await this.bankDetailsEntityRepository.save(entity);
        return BankDetailsMapper.fromEntityToDTO(result);
    }

    async deleteById(id: number): Promise<void | undefined> {
        await this.bankDetailsEntityRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
            throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
        }
        return;
    }
}
