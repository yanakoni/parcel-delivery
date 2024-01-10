import { PartialType } from '@nestjs/swagger';
import { CreatePostOfficeDto } from './create-postOffice.dto';

export class UpdatePostOfficeDto extends PartialType(CreatePostOfficeDto) {}
