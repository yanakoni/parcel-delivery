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
import { PostOfficeService } from '../service/postOffice.service';
import { CreatePostOfficeDto } from './dtos/create-postOffice.dto';
import { UpdatePostOfficeDto } from './dtos/update-postOffice.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('PostOffices')
@Controller('postOffices')
export class PostOfficeController {
    constructor(private readonly postOfficeService: PostOfficeService) {}

    @Get()
    @ApiQuery({ name: 'namePrefix', required: false })
    async findAll(@Query('namePrefix') namePrefix?: string) {
        const postOffices = await this.postOfficeService.findAll(namePrefix);
        return { data: postOffices };
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const postOffices = await this.postOfficeService.findOne(id);
        return { data: postOffices };
    }

    @Post()
    async create(@Body(new ValidationPipe()) createDto: CreatePostOfficeDto) {
        const postOffices = await this.postOfficeService.create(createDto);
        return { data: postOffices };
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body(new ValidationPipe()) updateDto: UpdatePostOfficeDto,
    ) {
        const updatedVehicle = await this.postOfficeService.update(
            id,
            updateDto,
        );
        return { data: updatedVehicle };
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        const deletedVehicle = await this.postOfficeService.remove(id);
        return { data: deletedVehicle };
    }
}
