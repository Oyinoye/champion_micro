/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from './base.dto';

import { ChampionDTO } from './champion.dto';

/**
 * A GuarantorDTO object.
 */
export class GuarantorDTO extends BaseDTO {
    @ApiModelProperty({ description: 'firstName field', required: false })
    firstName: string;

    @ApiModelProperty({ description: 'lastName field', required: false })
    lastName: string;

    @ApiModelProperty({ description: 'dateOfBirth field', required: false })
    dateOfBirth: any;

    @ApiModelProperty({ description: 'relationship field', required: false })
    relationship: string;

    @ApiModelProperty({ description: 'knowHowLong field', required: false })
    knowHowLong: string;

    @ApiModelProperty({ description: 'occupation field', required: false })
    occupation: string;

    @ApiModelProperty({ description: 'homeAddress field', required: false })
    homeAddress: string;

    @ApiModelProperty({ description: 'officeAddress field', required: false })
    officeAddress: string;

    @ApiModelProperty({ description: 'utilityUpload field', required: false })
    utilityUpload: any;

    utilityUploadContentType: string;
    @ApiModelProperty({ description: 'idUpload field', required: false })
    idUpload: any;

    idUploadContentType: string;

    @ApiModelProperty({ type: ChampionDTO, description: 'champion relationship' })
    champion: ChampionDTO;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
