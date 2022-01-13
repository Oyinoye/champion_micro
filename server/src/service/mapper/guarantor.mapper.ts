import { GuarantorEntity } from '../../domain/guarantor.entity';
import { GuarantorDTO } from '../dto/guarantor.dto';

/**
 * A Guarantor mapper object.
 */
export class GuarantorMapper {
    static fromDTOtoEntity(entityDTO: GuarantorDTO): GuarantorEntity {
        if (!entityDTO) {
            return;
        }
        const entity = new GuarantorEntity();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach(field => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: GuarantorEntity): GuarantorDTO {
        if (!entity) {
            return;
        }
        const entityDTO = new GuarantorDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach(field => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
