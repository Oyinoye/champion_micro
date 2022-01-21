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
import { PlatformDTO } from '../../service/dto/platform.dto';
import { PlatformService } from '../../service/platform.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/platforms')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiUseTags('platforms')
export class PlatformController {
    logger = new Logger('PlatformController');

    constructor(private readonly platformEntityService: PlatformService) {}

    @Get('/')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'List all records',
        type: PlatformDTO,
    })
    async getAll(@Req() req: Request): Promise<PlatformDTO[]> {
        const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
        const [results, count] = await this.platformEntityService.findAndCount({
            skip: +pageRequest.page * pageRequest.size,
            take: +pageRequest.size,
            order: pageRequest.sort.asOrder(),
        });
        // HeaderUtil.addPaginationHeaders(req.res, new Page(results, count, pageRequest));
        return results;
    }

    @Get('/:id')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'The found record',
        type: PlatformDTO,
    })
    async getOne(@Param('id') id: number): Promise<PlatformDTO> {
        return await this.platformEntityService.findById(id);
    }

    @PostMethod('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Create platformEntity' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: PlatformDTO,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(@Req() req: Request, @Body() platformEntityDTO: PlatformDTO): Promise<PlatformDTO> {
        const created = await this.platformEntityService.save(platformEntityDTO, req.user?.login);
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Platform', created.id);
        return created;
    }

    @Put('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update platformEntity' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: PlatformDTO,
    })
    async put(@Req() req: Request, @Body() platformEntityDTO: PlatformDTO): Promise<PlatformDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Platform', platformEntityDTO.id);
        return await this.platformEntityService.update(platformEntityDTO, req.user?.login);
    }

    @Put('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update platformEntity with id' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: PlatformDTO,
    })
    async putId(@Req() req: Request, @Body() platformEntityDTO: PlatformDTO): Promise<PlatformDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Platform', platformEntityDTO.id);
        return await this.platformEntityService.update(platformEntityDTO, req.user?.login);
    }

    @Delete('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Delete platformEntity' })
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    })
    async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
        HeaderUtil.addEntityDeletedHeaders(req.res, 'Platform', id);
        return await this.platformEntityService.deleteById(id);
    }
}
