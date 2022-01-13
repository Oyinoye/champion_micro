/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from './base.dto';

import { PlatformDTO } from './platform.dto';
import { MaxEvent } from '../../domain/enumeration/max-event';

/**
 * A ChampionDTO object.
 */
export class ChampionDTO extends BaseDTO {
    @IsNotEmpty()
    @ApiModelProperty({ description: 'championID field' })
    championID: string;

    @IsNotEmpty()
    @ApiModelProperty({ description: 'phoneNumber field' })
    phoneNumber: string;

    @ApiModelProperty({ enum: MaxEvent, description: 'status enum field', required: false })
    status: MaxEvent;

    @ApiModelProperty({ description: 'bvn field', required: false })
    bvn: number;

    @IsNotEmpty()
    @ApiModelProperty({ description: 'dateOfBirth field' })
    dateOfBirth: any;

    @ApiModelProperty({ type: PlatformDTO, description: 'platform relationship' })
    platform: PlatformDTO;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
