import { DriverLicenseEntity } from '../../domain/driver-license.entity';
import { DriverLicenseDTO } from '../dto/driver-license.dto';

/**
 * A DriverLicense mapper object.
 */
export class DriverLicenseMapper {
    static fromDTOtoEntity(entityDTO: DriverLicenseDTO): DriverLicenseEntity {
        if (!entityDTO) {
            return;
        }
        const entity = new DriverLicenseEntity();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach(field => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: DriverLicenseEntity): DriverLicenseDTO {
        if (!entity) {
            return;
        }
        const entityDTO = new DriverLicenseDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach(field => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
