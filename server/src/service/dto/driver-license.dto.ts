/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { BaseDTO } from './base.dto';

import { ChampionDTO } from './champion.dto';

/**
 * A DriverLicenseDTO object.
 */
export class DriverLicenseDTO extends BaseDTO {
    @ApiModelProperty({ description: 'licenseNumber field', required: false })
    licenseNumber: string;

    @ApiModelProperty({ description: 'issueDate field', required: false })
    issueDate: any;

    @ApiModelProperty({ description: 'expiryDate field', required: false })
    expiryDate: any;

    @ApiModelProperty({ description: 'address field', required: false })
    address: string;

    @ApiModelProperty({ description: 'comment field', required: false })
    comment: string;

    @ApiModelProperty({ type: ChampionDTO, description: 'champion relationship' })
    champion: ChampionDTO;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
