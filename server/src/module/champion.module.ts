import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChampionController } from '../web/rest/champion.controller';
import { ChampionRepository } from '../repository/champion.repository';
import { ChampionService } from '../service/champion.service';

@Module({
    imports: [TypeOrmModule.forFeature([ChampionRepository])],
    controllers: [ChampionController],
    providers: [ChampionService],
    exports: [ChampionService],
})
export class ChampionModule {}
