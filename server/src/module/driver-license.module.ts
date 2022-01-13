import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DriverLicenseController } from '../web/rest/driver-license.controller';
import { DriverLicenseRepository } from '../repository/driver-license.repository';
import { DriverLicenseService } from '../service/driver-license.service';

@Module({
    imports: [TypeOrmModule.forFeature([DriverLicenseRepository])],
    controllers: [DriverLicenseController],
    providers: [DriverLicenseService],
    exports: [DriverLicenseService],
})
export class DriverLicenseModule {}
