import { ChampionEntity } from '../../domain/champion.entity';
import { ChampionDTO } from '../dto/champion.dto';

/**
 * A Champion mapper object.
 */
export class ChampionMapper {
    static fromDTOtoEntity(entityDTO: ChampionDTO): ChampionEntity {
        if (!entityDTO) {
            return;
        }
        const entity = new ChampionEntity();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach(field => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: ChampionEntity): ChampionDTO {
        if (!entity) {
            return;
        }
        const entityDTO = new ChampionDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach(field => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
