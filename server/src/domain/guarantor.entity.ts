/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { ChampionEntity } from './champion.entity';

/**
 * Guarantor
 */
@Entity('guarantor')
export class GuarantorEntity extends BaseEntity {
    @Column({ name: 'first_name', nullable: true })
    firstName: string;

    @Column({ name: 'last_name', nullable: true })
    lastName: string;

    @Column({ type: 'date', name: 'date_of_birth', nullable: true })
    dateOfBirth: any;

    @Column({ name: 'relationship', nullable: true })
    relationship: string;

    @Column({ name: 'know_how_long', nullable: true })
    knowHowLong: string;

    @Column({ name: 'occupation', nullable: true })
    occupation: string;

    @Column({ name: 'home_address', nullable: true })
    homeAddress: string;

    @Column({ name: 'office_address', nullable: true })
    officeAddress: string;

    @Column({ type: 'blob', name: 'utility_upload', nullable: true })
    utilityUpload: any;

    @Column({ name: 'utility_upload_content_type', nullable: true })
    utilityUploadContentType: string;
    @Column({ type: 'blob', name: 'id_upload', nullable: true })
    idUpload: any;

    @Column({ name: 'id_upload_content_type', nullable: true })
    idUploadContentType: string;

    @OneToOne(type => ChampionEntity)
    @JoinColumn()
    champion: ChampionEntity;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
