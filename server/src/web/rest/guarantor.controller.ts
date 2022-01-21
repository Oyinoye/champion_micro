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
import { GuarantorDTO } from '../../service/dto/guarantor.dto';
import { GuarantorService } from '../../service/guarantor.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/guarantors')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiUseTags('guarantors')
export class GuarantorController {
    logger = new Logger('GuarantorController');

    constructor(private readonly guarantorEntityService: GuarantorService) {}

    @Get('/')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'List all records',
        type: GuarantorDTO,
    })
    async getAll(@Req() req: Request): Promise<GuarantorDTO[]> {
        const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
        const [results, count] = await this.guarantorEntityService.findAndCount({
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
        type: GuarantorDTO,
    })
    async getOne(@Param('id') id: number): Promise<GuarantorDTO> {
        return await this.guarantorEntityService.findById(id);
    }

    @PostMethod('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Create guarantorEntity' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: GuarantorDTO,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(@Req() req: Request, @Body() guarantorEntityDTO: GuarantorDTO): Promise<GuarantorDTO> {
        const created = await this.guarantorEntityService.save(guarantorEntityDTO, req.user?.login);
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Guarantor', created.id);
        return created;
    }

    @Put('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update guarantorEntity' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: GuarantorDTO,
    })
    async put(@Req() req: Request, @Body() guarantorEntityDTO: GuarantorDTO): Promise<GuarantorDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Guarantor', guarantorEntityDTO.id);
        return await this.guarantorEntityService.update(guarantorEntityDTO, req.user?.login);
    }

    @Put('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update guarantorEntity with id' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: GuarantorDTO,
    })
    async putId(@Req() req: Request, @Body() guarantorEntityDTO: GuarantorDTO): Promise<GuarantorDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Guarantor', guarantorEntityDTO.id);
        return await this.guarantorEntityService.update(guarantorEntityDTO, req.user?.login);
    }

    @Delete('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Delete guarantorEntity' })
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    })
    async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
        HeaderUtil.addEntityDeletedHeaders(req.res, 'Guarantor', id);
        return await this.guarantorEntityService.deleteById(id);
    }
}
