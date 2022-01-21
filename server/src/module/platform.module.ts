import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlatformController } from '../web/rest/platform.controller';
import { PlatformRepository } from '../repository/platform.repository';
import { PlatformService } from '../service/platform.service';

@Module({
    imports: [TypeOrmModule.forFeature([PlatformRepository])],
    controllers: [PlatformController],
    providers: [PlatformService],
    exports: [PlatformService],
})
export class PlatformModule {}
