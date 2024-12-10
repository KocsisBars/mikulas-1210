import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { KidsService } from './kids.service';
import { CreateKidDto } from './dto/create-kid.dto';
import { UpdateKidDto } from './dto/update-kid.dto';

@Controller('kids')
export class KidsController {
  constructor(private readonly kidsService: KidsService) {}

  @Post()
  create(@Body() createKidDto: CreateKidDto) {
    return this.kidsService.create(createKidDto);
  }

  @Get()
  findAll() {
    return this.kidsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const kid = await this.kidsService.findOne(+id);
    if (kid == null) {
      throw new NotFoundException("Nincs ilyen gyerek")
    }
    return kid;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateKidDto: UpdateKidDto) {
    return this.kidsService.update(+id, updateKidDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.kidsService.remove(+id);
  }
}
