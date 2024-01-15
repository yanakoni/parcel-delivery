import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    ValidationPipe,
} from '@nestjs/common';
import { Public, Resource, Roles, Scopes } from 'nest-keycloak-connect';
import { ApiTags } from '@nestjs/swagger';
import { combinePipeline, parseMongoAggregationFilter } from '../utils';
import { CreatePackageDto, UpdatePackageDto } from '../dtos';
import { PackageService } from '../service';
import { Package } from '../repository';
import { Sort } from '../types';
import { ParcelStatus } from '../enums';

@ApiTags('Packages')
@Controller('package')
@Resource(Package.name)
export class PackageController {
    constructor(private readonly parcelService: PackageService) {}

    @Get(':id')
    @Public()
    async findOne(@Param('id') id: string) {
        const parcel = await this.parcelService.findById(id);
        return { data: parcel };
    }

    @Post()
    @Public()
    async create(@Body(new ValidationPipe()) createDto: CreatePackageDto) {
        const parcel = await this.parcelService.create(createDto);
        return { data: parcel };
    }

    @Put(':id')
    @Roles({ roles: ['user', 'admin'] })
    @Scopes('Update')
    async update(
        @Param('id') id: string,
        @Body(new ValidationPipe()) updateDto: UpdatePackageDto,
    ) {
        const updatedPackage = await this.parcelService.update(id, updateDto);
        return { data: updatedPackage };
    }

    @Put('/status')
    @Roles({ roles: ['admin'] })
    @Scopes('Update')
    async updateStatus(@Query('_id') _id: string) {
        const updatedPackage = await this.parcelService.update(_id, {
            status: ParcelStatus.PENDING,
        });
        return { data: updatedPackage };
    }

    @Delete(':id')
    @Roles({ roles: ['user', 'admin'] })
    @Scopes('Delete')
    async remove(@Param('id') id: string) {
        const deletedPackage = await this.parcelService.remove(id);
        return { data: deletedPackage };
    }

    @Public()
    @Get()
    public async getPaginated(
        @Query('filter') filter?: string,
        @Query('sort') sort?: string,
        @Query('skip') skip?: number,
        @Query('limit') limit?: number,
    ): Promise<
        | {
              items: Package[];
              itemsCount: number;
          }
        | []
    > {
        let filterParsed: any = {};
        let sortParsed: Sort | null = null;

        if (filter) {
            filterParsed = parseMongoAggregationFilter(filter);
        }

        if (sort) {
            sortParsed = JSON.parse(sort);
        }

        const pipeline = combinePipeline(skip, limit, sortParsed, filterParsed);
        return this.parcelService.findPaginated(pipeline);
    }
}
