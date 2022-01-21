/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { BaseDTO } from './base.dto';

import { ChampionDTO } from './champion.dto';

/**
 * A BankDetailsDTO object.
 */
export class BankDetailsDTO extends BaseDTO {
    @ApiModelProperty({ description: 'bankName field', required: false })
    bankName: string;

    @ApiModelProperty({ description: 'accountNumber field', required: false })
    accountNumber: string;

    @ApiModelProperty({ type: ChampionDTO, description: 'champion relationship' })
    champion: ChampionDTO;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
