/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { PlatformEntity } from './platform.entity';
import { MaxEvent } from './enumeration/max-event';

import { UserEntity } from './user.entity';

/**
 * Champion
 */
@Entity('champion')
export class ChampionEntity extends BaseEntity {
    @Column({ name: 'champion_id' })
    championID: string;

    @Column({ name: 'phone_number' })
    phoneNumber: string;

    @Column({ type: 'simple-enum', name: 'status', enum: MaxEvent })
    status: MaxEvent;

    @Column({ type: 'integer', name: 'bvn', nullable: true })
    bvn: number;

    @Column({ type: 'date', name: 'date_of_birth', nullable: true })
    dateOfBirth: any;

    @OneToOne(type => UserEntity)
    @JoinColumn()
    user: UserEntity;

    @ManyToOne(type => PlatformEntity)
    platform: PlatformEntity;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
