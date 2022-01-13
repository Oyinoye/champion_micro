import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GuarantorController } from '../web/rest/guarantor.controller';
import { GuarantorRepository } from '../repository/guarantor.repository';
import { GuarantorService } from '../service/guarantor.service';

@Module({
    imports: [TypeOrmModule.forFeature([GuarantorRepository])],
    controllers: [GuarantorController],
    providers: [GuarantorService],
    exports: [GuarantorService],
})
export class GuarantorModule {}
