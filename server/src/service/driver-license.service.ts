import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { DriverLicenseDTO } from '../service/dto/driver-license.dto';
import { DriverLicenseMapper } from '../service/mapper/driver-license.mapper';
import { DriverLicenseRepository } from '../repository/driver-license.repository';

const relationshipNames = [];

@Injectable()
export class DriverLicenseService {
    logger = new Logger('DriverLicenseService');

    constructor(
        @InjectRepository(DriverLicenseRepository) private driverLicenseEntityRepository: DriverLicenseRepository,
    ) {}

    async findById(id: number): Promise<DriverLicenseDTO | undefined> {
        const options = { relations: relationshipNames };
        const result = await this.driverLicenseEntityRepository.findOne(id, options);
        return DriverLicenseMapper.fromEntityToDTO(result);
    }

    async findByFields(options: FindOneOptions<DriverLicenseDTO>): Promise<DriverLicenseDTO | undefined> {
        const result = await this.driverLicenseEntityRepository.findOne(options);
        return DriverLicenseMapper.fromEntityToDTO(result);
    }

    async findAndCount(options: FindManyOptions<DriverLicenseDTO>): Promise<[DriverLicenseDTO[], number]> {
        options.relations = relationshipNames;
        const resultList = await this.driverLicenseEntityRepository.findAndCount(options);
        const driverLicenseEntityDTO: DriverLicenseDTO[] = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach(driverLicenseEntity =>
                driverLicenseEntityDTO.push(DriverLicenseMapper.fromEntityToDTO(driverLicenseEntity)),
            );
            resultList[0] = driverLicenseEntityDTO;
        }
        return resultList;
    }

    async save(driverLicenseEntityDTO: DriverLicenseDTO, creator?: string): Promise<DriverLicenseDTO | undefined> {
        const entity = DriverLicenseMapper.fromDTOtoEntity(driverLicenseEntityDTO);
        if (creator) {
            if (!entity.createdBy) {
                entity.createdBy = creator;
            }
            entity.lastModifiedBy = creator;
        }
        const result = await this.driverLicenseEntityRepository.save(entity);
        return DriverLicenseMapper.fromEntityToDTO(result);
    }

    async update(driverLicenseEntityDTO: DriverLicenseDTO, updater?: string): Promise<DriverLicenseDTO | undefined> {
        const entity = DriverLicenseMapper.fromDTOtoEntity(driverLicenseEntityDTO);
        if (updater) {
            entity.lastModifiedBy = updater;
        }
        const result = await this.driverLicenseEntityRepository.save(entity);
        return DriverLicenseMapper.fromEntityToDTO(result);
    }

    async deleteById(id: number): Promise<void | undefined> {
        await this.driverLicenseEntityRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
            throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
        }
        return;
    }
}
