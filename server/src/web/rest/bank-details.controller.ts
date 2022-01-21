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
import { BankDetailsDTO } from '../../service/dto/bank-details.dto';
import { BankDetailsService } from '../../service/bank-details.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/bank-details')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiUseTags('bank-details')
export class BankDetailsController {
    logger = new Logger('BankDetailsController');

    constructor(private readonly bankDetailsEntityService: BankDetailsService) {}

    @Get('/')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'List all records',
        type: BankDetailsDTO,
    })
    async getAll(@Req() req: Request): Promise<BankDetailsDTO[]> {
        const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
        const [results, count] = await this.bankDetailsEntityService.findAndCount({
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
        type: BankDetailsDTO,
    })
    async getOne(@Param('id') id: number): Promise<BankDetailsDTO> {
        return await this.bankDetailsEntityService.findById(id);
    }

    @PostMethod('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Create bankDetailsEntity' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: BankDetailsDTO,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(@Req() req: Request, @Body() bankDetailsEntityDTO: BankDetailsDTO): Promise<BankDetailsDTO> {
        const created = await this.bankDetailsEntityService.save(bankDetailsEntityDTO, req.user?.login);
        HeaderUtil.addEntityCreatedHeaders(req.res, 'BankDetails', created.id);
        return created;
    }

    @Put('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update bankDetailsEntity' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: BankDetailsDTO,
    })
    async put(@Req() req: Request, @Body() bankDetailsEntityDTO: BankDetailsDTO): Promise<BankDetailsDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'BankDetails', bankDetailsEntityDTO.id);
        return await this.bankDetailsEntityService.update(bankDetailsEntityDTO, req.user?.login);
    }

    @Put('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update bankDetailsEntity with id' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: BankDetailsDTO,
    })
    async putId(@Req() req: Request, @Body() bankDetailsEntityDTO: BankDetailsDTO): Promise<BankDetailsDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'BankDetails', bankDetailsEntityDTO.id);
        return await this.bankDetailsEntityService.update(bankDetailsEntityDTO, req.user?.login);
    }

    @Delete('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Delete bankDetailsEntity' })
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    })
    async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
        HeaderUtil.addEntityDeletedHeaders(req.res, 'BankDetails', id);
        return await this.bankDetailsEntityService.deleteById(id);
    }
}
