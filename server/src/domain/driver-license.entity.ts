/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { ChampionEntity } from './champion.entity';

/**
 * Driver License
 */
@Entity('driver_license')
export class DriverLicenseEntity extends BaseEntity {
    @Column({ name: 'license_number', nullable: true })
    licenseNumber: string;

    @Column({ type: 'date', name: 'issue_date', nullable: true })
    issueDate: any;

    @Column({ type: 'date', name: 'expiry_date', nullable: true })
    expiryDate: any;

    @Column({ name: 'address', nullable: true })
    address: string;

    @Column({ name: 'comment', nullable: true })
    comment: string;

    @OneToOne(type => ChampionEntity)
    @JoinColumn()
    champion: ChampionEntity;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
