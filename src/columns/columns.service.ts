import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository, UpdateResult } from 'typeorm';
import { ColumnEntity } from './entities/column.entity';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';

@Injectable()
export class ColumnsService {

    constructor(
        @InjectRepository(ColumnEntity)
        private readonly columnsRepository: Repository<ColumnEntity>) { }

    async create(createColumnDto: CreateColumnDto): Promise<ColumnEntity> {
        const { userId } = createColumnDto;

        const column = this.columnsRepository.create({ ...createColumnDto, user: { id: userId } });
        return this.columnsRepository.save(column);
    }

    async findOneBy(options: FindOptionsWhere<ColumnEntity>): Promise<ColumnEntity> {
        const column = await this.columnsRepository.findOneBy({ ...options });
        if (!column) {
            throw new NotFoundException(`Column with options ${{ ...options }} not found`);
        }
        return column;
    }

    async findAllBy(options: FindOptionsWhere<ColumnEntity>): Promise<ColumnEntity[]> {
        const columns = await this.columnsRepository.findBy({ ...options });
        if (!columns) {
            throw new NotFoundException(`Columns with options ${{ ...options }} not found`);
        }
        return columns;
    }

    async update(id: number, updateColumnDto: UpdateColumnDto): Promise<ColumnEntity> {
        const result = await this.columnsRepository.update(id, { ...updateColumnDto });
        if (result.affected === 0) {
            throw new NotFoundException(`Update column with ID ${id} impossible`);
        }
        return this.findOneBy({ id });
    };

    async remove(id: number): Promise<void> {
        const result = await this.columnsRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Column with ID ${id} not found`);
        }
    }
}
