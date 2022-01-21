import { BankDetailsEntity } from '../../domain/bank-details.entity';
import { BankDetailsDTO } from '../dto/bank-details.dto';

/**
 * A BankDetails mapper object.
 */
export class BankDetailsMapper {
    static fromDTOtoEntity(entityDTO: BankDetailsDTO): BankDetailsEntity {
        if (!entityDTO) {
            return;
        }
        const entity = new BankDetailsEntity();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach(field => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: BankDetailsEntity): BankDetailsDTO {
        if (!entity) {
            return;
        }
        const entityDTO = new BankDetailsDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach(field => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
