import { CreateColumnDto } from './create-column.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateColumnDto extends PartialType(CreateColumnDto) {
}