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
import { DriverLicenseDTO } from '../../service/dto/driver-license.dto';
import { DriverLicenseService } from '../../service/driver-license.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/driver-licenses')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiUseTags('driver-licenses')
export class DriverLicenseController {
    logger = new Logger('DriverLicenseController');

    constructor(private readonly driverLicenseEntityService: DriverLicenseService) {}

    @Get('/')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'List all records',
        type: DriverLicenseDTO,
    })
    async getAll(@Req() req: Request): Promise<DriverLicenseDTO[]> {
        const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
        const [results, count] = await this.driverLicenseEntityService.findAndCount({
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
        type: DriverLicenseDTO,
    })
    async getOne(@Param('id') id: number): Promise<DriverLicenseDTO> {
        return await this.driverLicenseEntityService.findById(id);
    }

    @PostMethod('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Create driverLicenseEntity' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: DriverLicenseDTO,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(@Req() req: Request, @Body() driverLicenseEntityDTO: DriverLicenseDTO): Promise<DriverLicenseDTO> {
        const created = await this.driverLicenseEntityService.save(driverLicenseEntityDTO, req.user?.login);
        HeaderUtil.addEntityCreatedHeaders(req.res, 'DriverLicense', created.id);
        return created;
    }

    @Put('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update driverLicenseEntity' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: DriverLicenseDTO,
    })
    async put(@Req() req: Request, @Body() driverLicenseEntityDTO: DriverLicenseDTO): Promise<DriverLicenseDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'DriverLicense', driverLicenseEntityDTO.id);
        return await this.driverLicenseEntityService.update(driverLicenseEntityDTO, req.user?.login);
    }

    @Put('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update driverLicenseEntity with id' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: DriverLicenseDTO,
    })
    async putId(@Req() req: Request, @Body() driverLicenseEntityDTO: DriverLicenseDTO): Promise<DriverLicenseDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'DriverLicense', driverLicenseEntityDTO.id);
        return await this.driverLicenseEntityService.update(driverLicenseEntityDTO, req.user?.login);
    }

    @Delete('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Delete driverLicenseEntity' })
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    })
    async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
        HeaderUtil.addEntityDeletedHeaders(req.res, 'DriverLicense', id);
        return await this.driverLicenseEntityService.deleteById(id);
    }
}
