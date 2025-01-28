import { OwnershipGuard } from '@/auth/guards/ownership.guard';
import { Body, Controller, Delete, Post, UseGuards, Param, ParseIntPipe, Put } from '@nestjs/common';
import { CreateColumnDto } from './dto/create-column.dto';
import { ColumnsService } from './columns.service';
import { UpdateColumnDto } from './dto/update-column.dto';

@Controller('columns')
export class ColumnsController {
    constructor(private readonly columnsService: ColumnsService) { }

    @UseGuards(OwnershipGuard)
    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number) {
        return this.columnsService.remove(id);
    }

    @UseGuards(OwnershipGuard)
    @Post()
    async create(@Body() createColumnDto: CreateColumnDto) {
        return this.columnsService.create(createColumnDto)
    }

    @UseGuards(OwnershipGuard)
    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() updateColumnDto: UpdateColumnDto) {
        return this.columnsService.update(id, updateColumnDto)
    }
}
