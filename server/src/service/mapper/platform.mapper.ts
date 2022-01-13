import { PlatformEntity } from '../../domain/platform.entity';
import { PlatformDTO } from '../dto/platform.dto';

/**
 * A Platform mapper object.
 */
export class PlatformMapper {
    static fromDTOtoEntity(entityDTO: PlatformDTO): PlatformEntity {
        if (!entityDTO) {
            return;
        }
        const entity = new PlatformEntity();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach(field => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: PlatformEntity): PlatformDTO {
        if (!entity) {
            return;
        }
        const entityDTO = new PlatformDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach(field => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
