import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankDetailsController } from '../web/rest/bank-details.controller';
import { BankDetailsRepository } from '../repository/bank-details.repository';
import { BankDetailsService } from '../service/bank-details.service';

@Module({
    imports: [TypeOrmModule.forFeature([BankDetailsRepository])],
    controllers: [BankDetailsController],
    providers: [BankDetailsService],
    exports: [BankDetailsService],
})
export class BankDetailsModule {}
