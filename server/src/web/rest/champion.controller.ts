import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Delete,
    Get,
    Logger,
    Param,
    Post as PostMethod,
    Put,
    UseGuards,
    Req,
    UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { ChampionDTO } from '../../service/dto/champion.dto';
import { ChampionService } from '../../service/champion.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/champions')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiUseTags('champions')
export class ChampionController {
    logger = new Logger('ChampionController');

    constructor(private readonly championEntityService: ChampionService) {}

    @Get('/')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'List all records',
        type: ChampionDTO,
    })
    async getAll(@Req() req: Request): Promise<ChampionDTO[]> {
        const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
        const [results, count] = await this.championEntityService.findAndCount({
            skip: +pageRequest.page * pageRequest.size,
            take: +pageRequest.size,
            order: pageRequest.sort.asOrder(),
        });
        HeaderUtil.addPaginationHeaders(req.res, new Page(results, count, pageRequest));
        return results;
    }

    @Get('/:id')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'The found record',
        type: ChampionDTO,
    })
    async getOne(@Param('id') id: number): Promise<ChampionDTO> {
        return await this.championEntityService.findById(id);
    }

    @PostMethod('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Create championEntity' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: ChampionDTO,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(@Req() req: Request, @Body() championEntityDTO: ChampionDTO): Promise<ChampionDTO> {
        const created = await this.championEntityService.save(championEntityDTO, req.user?.login);
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Champion', created.id);
        return created;
    }

    @Put('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update championEntity' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: ChampionDTO,
    })
    async put(@Req() req: Request, @Body() championEntityDTO: ChampionDTO): Promise<ChampionDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Champion', championEntityDTO.id);
        return await this.championEntityService.update(championEntityDTO, req.user?.login);
    }

    @Put('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update championEntity with id' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: ChampionDTO,
    })
    async putId(@Req() req: Request, @Body() championEntityDTO: ChampionDTO): Promise<ChampionDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Champion', championEntityDTO.id);
        return await this.championEntityService.update(championEntityDTO, req.user?.login);
    }

    @Delete('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Delete championEntity' })
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    })
    async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
        HeaderUtil.addEntityDeletedHeaders(req.res, 'Champion', id);
        return await this.championEntityService.deleteById(id);
    }
}
