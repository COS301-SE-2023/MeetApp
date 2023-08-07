import { Controller, Get, Param, Delete, Post, Body, Headers, Logger } from '@nestjs/common';
import { AttendancesService } from './attendances.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

@Controller('attendances')
@ApiTags('Attendances')
export class AttendancesController {
  constructor(private readonly attendancesService: AttendancesService) {}

  @Post()
  create(@Body() createAttendanceDto: CreateAttendanceDto, @Headers('x-api-key') apiXHeader: string) {
    Logger.log(apiXHeader)
    return this.attendancesService.create(createAttendanceDto);
  }

  @Get()
  findAll(@Headers('x-api-key') apiXHeader: string) {
    Logger.log(apiXHeader)
    return this.attendancesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Headers('x-api-key') apiXHeader: string) {
    Logger.log(apiXHeader)
    return this.attendancesService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Headers('x-api-key') apiXHeader: string) {
    Logger.log(apiXHeader)
    return this.attendancesService.remove(id);
  }
}
