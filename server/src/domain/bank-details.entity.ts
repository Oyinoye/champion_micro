/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { ChampionEntity } from './champion.entity';

/**
 * Bank Details
 */
@Entity('bank_details')
export class BankDetailsEntity extends BaseEntity {
    @Column({ name: 'bank_name', nullable: true })
    bankName: string;

    @Column({ name: 'account_number', nullable: true })
    accountNumber: string;

    @ManyToOne(type => ChampionEntity)
    champion: ChampionEntity;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
