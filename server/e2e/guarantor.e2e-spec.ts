import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { GuarantorDTO } from '../src/service/dto/guarantor.dto';
import { GuarantorService } from '../src/service/guarantor.service';

describe('Guarantor Controller', () => {
    let app: INestApplication;

    const authGuardMock = { canActivate: (): any => true };
    const rolesGuardMock = { canActivate: (): any => true };
    const entityMock: any = {
        id: 'entityId',
    };

    const serviceMock = {
        findById: (): any => entityMock,
        findAndCount: (): any => [entityMock, 0],
        save: (): any => entityMock,
        update: (): any => entityMock,
        deleteById: (): any => entityMock,
    };

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        })
            .overrideGuard(AuthGuard)
            .useValue(authGuardMock)
            .overrideGuard(RolesGuard)
            .useValue(rolesGuardMock)
            .overrideProvider(GuarantorService)
            .useValue(serviceMock)
            .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/GET all guarantors ', async () => {
        const getEntities: GuarantorDTO[] = (
            await request(app.getHttpServer())
                .get('/api/guarantors')
                .expect(200)
        ).body;

        expect(getEntities).toEqual(entityMock);
    });

    it('/GET guarantors by id', async () => {
        const getEntity: GuarantorDTO = (
            await request(app.getHttpServer())
                .get('/api/guarantors/' + entityMock.id)
                .expect(200)
        ).body;

        expect(getEntity).toEqual(entityMock);
    });

    it('/POST create guarantors', async () => {
        const createdEntity: GuarantorDTO = (
            await request(app.getHttpServer())
                .post('/api/guarantors')
                .send(entityMock)
                .expect(201)
        ).body;

        expect(createdEntity).toEqual(entityMock);
    });

    it('/PUT update guarantors', async () => {
        const updatedEntity: GuarantorDTO = (
            await request(app.getHttpServer())
                .put('/api/guarantors')
                .send(entityMock)
                .expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/PUT update guarantors from id', async () => {
        const updatedEntity: GuarantorDTO = (
            await request(app.getHttpServer())
                .put('/api/guarantors/' + entityMock.id)
                .send(entityMock)
                .expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/DELETE guarantors', async () => {
        const deletedEntity: GuarantorDTO = (
            await request(app.getHttpServer())
                .delete('/api/guarantors/' + entityMock.id)
                .expect(204)
        ).body;

        expect(deletedEntity).toEqual({});
    });

    afterEach(async () => {
        await app.close();
    });
});
